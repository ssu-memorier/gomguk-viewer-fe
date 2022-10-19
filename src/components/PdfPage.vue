<template>
    <div ref="$pdfPage" class="pdfPage card">
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
        >
        </highlight-layer>
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted, watch, computed } from 'vue';
import { usePdfStore } from '@/store/pdf';
import SelectionLayer from '@/components/layer/SelectionLayer.vue';
import HighlightLayer from '@/components/layer/HighlightLayer.vue';
import copyCanvas from '@/utils/copyCanvas';
import Page from '@/classes/Page';
import createDebounce from '@/utils/createDebounce';
import { SizeType } from '@/types/SizeType';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});

const isChangingSize = ref<boolean>(false);
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $highResolutionLayer = ref<HTMLCanvasElement>();
const $lowResolutionLayer = ref<HTMLCanvasElement>();
const $textLayer = ref<HTMLDivElement>();
const $selectionLayer = ref();
const $highlightLayer = ref();
let originalPageSize: SizeType = {
    width: 0,
    height: 0,
};

const debouncedHighResolutionRender = createDebounce(
    async (newPageSize: SizeType) => {
        resizeCanvas($highResolutionLayer.value, newPageSize);
        resizeCanvas($selectionLayer.value, newPageSize);
        resizeCanvas($highlightLayer.value, newPageSize);
        resizeElement($textLayer.value, newPageSize);

        originalPageSize = newPageSize;
        await drawHighResolutionLayer();
        await renderTextLayer();
        if ($highResolutionLayer.value) {
            isChangingSize.value = false;
            drawLowResolutionLayer($highResolutionLayer.value);
        }
    },
    500
);

let page: Page | undefined;
const highResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$highResolutionLayer.value) return null;
    return $highResolutionLayer.value.getContext('2d');
});
const lowResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$lowResolutionLayer.value) return null;
    return $lowResolutionLayer.value.getContext('2d');
});

onMounted(async () => {
    /**
     * 페이지가 마운트되면
     * 페이지 사이즈를 조절하고
     * 고해상도 페이지를 랜더링하고
     * 텍스트를 랜더링한다.
     */
    page = await pdfStore.getPage(props.pageIndex);

    if (!page) return;

    originalPageSize = page.size;
    resizePage(originalPageSize);
    await drawHighResolutionLayer();
    await renderTextLayer();

    watch(page.viewport, async (newViewport) => {
        if (!newViewport) return;
        const newPageSize: SizeType = {
            width: newViewport.width,
            height: newViewport.height,
        };
        await changePageSize(newPageSize);
    });
});
/**
 * scaleChange는 PDF 페이지의 스케일을 변경하는 로직으로 아래의 과정을 거칩니다.
 * canvas확대/축소 (해상도가 낮아짐) -> 고해상도 canvas를 로딩
 * @param newPageSize
 */
async function changePageSize(newPageSize: SizeType) {
    if (
        !highResolutionCtx.value ||
        !lowResolutionCtx.value ||
        !$lowResolutionLayer.value
    )
        return;

    isChangingSize.value = true;
    const originScaleCanvas = copyCanvas(highResolutionCtx.value);

    resizeCanvas($lowResolutionLayer.value, newPageSize);
    resizeElement($pdfPage.value, newPageSize);
    rescaleCanvas($lowResolutionLayer.value, newPageSize, originalPageSize);
    drawLowResolutionLayer(originScaleCanvas);
    debouncedHighResolutionRender(newPageSize);
}
function resizePage(pageSize: SizeType) {
    if (
        !$pdfPage.value ||
        !$highResolutionLayer.value ||
        !$selectionLayer.value ||
        !$textLayer.value ||
        !$lowResolutionLayer.value
    )
        return;

    resizeElement($pdfPage.value, pageSize);
    resizeCanvas($lowResolutionLayer.value, pageSize);
    resizeCanvas($highResolutionLayer.value, pageSize);
    resizeCanvas($selectionLayer.value.$el, pageSize);
    resizeCanvas($highlightLayer.value.$el, pageSize);
    resizeElement($textLayer.value, pageSize);
}

function drawLowResolutionLayer(originScaleCanvas: HTMLCanvasElement) {
    if (!lowResolutionCtx.value) return;

    lowResolutionCtx.value.drawImage(originScaleCanvas, 0, 0);
}

async function drawHighResolutionLayer() {
    if (!page || !highResolutionCtx.value) return;

    const tempCanvas = document.createElement('canvas');
    resizeCanvas(tempCanvas, page.size);
    await page.renderPdfLayer(tempCanvas);

    highResolutionCtx.value.drawImage(tempCanvas, 0, 0);
}

async function renderTextLayer() {
    if (!page || !$textLayer.value) return;

    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
}

function resizeCanvas(canvas: HTMLCanvasElement | undefined, size: SizeType) {
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;
}
function rescaleCanvas(
    canvas: HTMLCanvasElement | undefined,
    newSize: SizeType,
    oldSize: SizeType
) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx?.scale(newSize.width / oldSize.width, newSize.height / oldSize.height);
}
function resizeElement(el: HTMLElement | undefined, size: SizeType) {
    if (!el) return;

    el.style.width = Math.floor(size.width) + 'px';
    el.style.height = Math.floor(size.height) + 'px';
}
</script>

<style lang="scss" scoped>
.pdfPage {
    overflow: hidden;
    position: relative;
    margin: 0 auto 1rem auto;
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
