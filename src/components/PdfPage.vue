<template>
    <div
        ref="$pdfPage"
        class="pdfPage card"
        @mousedown="eraseStart"
        @mousemove="eraseHandler"
        @mouseup="eraseEnd"
    >
        <canvas ref="$highResolutionLayer" class="highResolutionLayer"></canvas>
        <canvas
            ref="$lowResolutionLayer"
            class="lowResolutionLayer"
            :class="{ show: isChangingSize }"
        ></canvas>
        <div
            ref="$textLayer"
            class="textLayer"
            :data-page-index="pageIndex"
        ></div>
        <selection-layer
            class="selectionLayer"
            ref="$selectionLayer"
            :pageIndex="pageIndex"
        ></selection-layer>
        <highlight-layer
            class="highlightLayer"
            ref="$highlightLayer"
            :pageIndex="pageIndex"
            :width="originalPageSize.width"
            :height="originalPageSize.height"
            :class="{ hide: isChangingSize }"
        >
        </highlight-layer>
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted, watch, computed } from 'vue';
import { usePdfStore } from '@/store/file/pdf';
import { useToolsStore } from '@/store/file/tools';
import { useHighlightStore } from '@/store/file/highlight';
import SelectionLayer from '@/components/layer/SelectionLayer.vue';
import HighlightLayer from '@/components/layer/HighlightLayer.vue';
import copyCanvas from '@/utils/copyCanvas';
import createDebounce from '@/utils/createDebounce';
import resizeCanvas from '@/utils/resizeCanvas';
import resizeElement from '@/utils/resizeElement';
import rescaleCanvas from '@/utils/rescaleCanvas';
import { SizeType } from '@/types/SizeType';
import PDF from '@/constants/PDF';
import TOOL from '@/constants/TOOL';
import { IPos } from '@/Interface/IPos';
import Highlight from '@/classes/Highlight';
import getSelectedLines from '@/utils/getSelectedLines';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
    viewportId: {
        type: String,
        required: false,
    },
});

const isChangingSize = ref<boolean>(false);
const isIntersecting = ref<boolean>(false);
const isErasing = ref<boolean>(false);
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $textLayer = ref<HTMLDivElement>();
const $highResolutionLayer = ref<HTMLCanvasElement>();
const $lowResolutionLayer = ref<HTMLCanvasElement>();
const $selectionLayer = ref();
const $highlightLayer = ref();
const toolsStore = useToolsStore();
const highlightStore = useHighlightStore();
const highResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$highResolutionLayer.value) return null;
    return $highResolutionLayer.value.getContext('2d');
});
const lowResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$lowResolutionLayer.value) return null;
    return $lowResolutionLayer.value.getContext('2d');
});

const originalPageSize = ref<SizeType>({
    width: 0,
    height: 0,
});

const debouncedRenderPage = createDebounce(async (newPageSize: SizeType) => {
    await renderPage(newPageSize);
    isChangingSize.value = false;
}, PDF.RENDER_LATENCY);

onMounted(async () => {
    const page = await pdfStore.getPage(props.pageIndex);
    if (!page) return;
    resizeElement($pdfPage.value, page.size);

    const observer = new IntersectionObserver(
        async ([entry]) => {
            isIntersecting.value = entry.isIntersecting;
        },
        {
            root: props.viewportId
                ? document.getElementById(props.viewportId)
                : null,
            threshold: 0,
            rootMargin: PDF.ROOT_MARGIN,
        }
    );
    if ($pdfPage.value) {
        observer.observe($pdfPage.value);
    }

    watch(page.viewport, async () => {
        const newSize = page.size;
        resizeElement($pdfPage.value, newSize);
        if (!isIntersecting.value) return;

        await changePageSize(newSize);
    });
});

watch(isIntersecting, async () => {
    if (!isIntersecting.value) return;

    const page = await pdfStore.getPage(props.pageIndex);
    if (!page) return;
    if (
        page.size.width === originalPageSize.value.width &&
        page.size.height === originalPageSize.value.height
    )
        return;

    await renderPage(page.size);
});
/**
 * changePageSize PDF 페이지의 크기를 변경하는 로직으로 아래의 과정을 거칩니다.
 * 1. 저해상도 레이어 로딩(캔버스 확대/축소로 해상도가 낮아짐)
 * 2. 고해상도 canvas를 랜더링한 뒤 저해상도 레이어를 숨김
 * @param newPageSize
 */
async function changePageSize(newPageSize: SizeType) {
    isChangingSize.value = true;

    renderLowResolutionLayer(newPageSize);
    debouncedRenderPage(newPageSize);
}
/**
 * renderPage는 입력된 사이즈로 페이지를 랜더링합니다.
 * 저해상도 레이어(lowResolutionLayer) 랜더링은 포함하지 않습니다.
 * @param pageSize
 */
async function renderPage(pageSize: SizeType) {
    resizeElement($pdfPage.value, pageSize);
    resizeCanvas($selectionLayer.value.$el, pageSize);

    await renderHighResolutionLayer(pageSize);
    await renderTextLayer(pageSize);

    originalPageSize.value = pageSize;
}
/**
 * 저해상도 레이어를 랜더링합니다.
 * @param pageSize
 */
function renderLowResolutionLayer(pageSize: SizeType) {
    const originCanvas = copyCanvas($highResolutionLayer.value);

    resizeCanvas($lowResolutionLayer.value, pageSize);
    rescaleCanvas($lowResolutionLayer.value, pageSize, originalPageSize.value);

    if (originCanvas) {
        drawLowResolutionLayer(originCanvas);
    }
}
/**
 * 고해상도 레이어를 랜더링합니다.
 * @param pageSize
 */
async function renderHighResolutionLayer(pageSize: SizeType) {
    const page = await pdfStore.getPage(props.pageIndex);
    if (!page) return;

    resizeCanvas($highResolutionLayer.value, pageSize);

    const newPdfLayer = await page.createPdfLayer();
    drawHighResolutionLayer(newPdfLayer);
}

function drawLowResolutionLayer(originScaleCanvas: HTMLCanvasElement) {
    if (!lowResolutionCtx.value) return;

    lowResolutionCtx.value.drawImage(originScaleCanvas, 0, 0);
}

function drawHighResolutionLayer(highResolutionCanvas: HTMLCanvasElement) {
    if (!highResolutionCtx.value) return;

    highResolutionCtx.value.drawImage(highResolutionCanvas, 0, 0);
}
/**
 * 텍스트 레이어를 랜더링합니다.
 * @param pageSize
 */
async function renderTextLayer(pageSize: SizeType) {
    const page = await pdfStore.getPage(props.pageIndex);

    if (!page || !$textLayer.value) return;

    resizeElement($textLayer.value, pageSize);
    const fragment = await page.createTextLayerFragment();
    $textLayer.value.innerHTML = '';
    $textLayer.value.appendChild(fragment);
    page.addTokenInfo($textLayer.value);
}
function eraseStart() {
    isErasing.value = true;
}
function eraseEnd() {
    isErasing.value = false;
}
function eraseHandler(evt: MouseEvent) {
    if (toolsStore.tool !== TOOL.ERASER) return;
    if (!isErasing.value) return;

    const rect = $pdfPage.value?.getBoundingClientRect();
    if (!rect) return;

    const pos: IPos = {
        x: evt.x - rect.x,
        y: evt.y - rect.y,
    };

    const target = findOverlappedHighlight(pos);

    if (!target) return;

    highlightStore.deleteHighlight(target);
}

function findOverlappedHighlight(pos: IPos): Highlight | undefined {
    const highlights = highlightStore.getHiglightsInPage(props.pageIndex);

    return highlights.find((h) => {
        const range = h.getRange();
        if (!range) return;

        const lines = getSelectedLines(range);
        return lines.some((line) => line.rect.isOverlap(pos.x, pos.y));
    });
}
</script>

<style lang="scss" scoped>
.pdfPage {
    overflow: hidden;
    position: relative;
    content-visibility: auto;
    margin: 1rem auto 2rem auto;
    .textLayer,
    .selectionLayer,
    .highlightLayer,
    .lowResolutionLayer,
    .highResolutionLayer {
        position: absolute;
        left: 0;
        top: 0;
    }
    &::v-deep .textLayer {
        text-align: initial;
        overflow: hidden;
        opacity: 0.2;
        line-height: 1;
        z-index: 10;
        span,
        br {
            color: transparent;
            position: absolute;
            white-space: pre;
            transform-origin: 0% 0%;
            overflow: hidden;
            line-height: 100%;
            vertical-align: bottom;
        }
        ::selection {
            color: transparent;
            background: transparent;
        }
    }
    .lowResolutionLayer {
        visibility: hidden;
    }
    .lowResolutionLayer.show {
        visibility: visible;
    }
    .highlightLayer.hide {
        visibility: hidden;
    }
    .selectionLayer {
        z-index: 100;
        opacity: 0.3;
    }
    .textLayer {
        z-index: 200;
        opacity: 0;
    }
}
</style>
