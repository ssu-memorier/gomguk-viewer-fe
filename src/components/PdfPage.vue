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
import createDebounce from '@/utils/createDebounce';
import { SizeType } from '@/types/SizeType';
import resizeCanvas from '@/utils/resizeCanvas';
import resizeElement from '@/utils/resizeElement';
import rescaleCanvas from '@/utils/rescaleCanvas';

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

const highResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$highResolutionLayer.value) return null;
    return $highResolutionLayer.value.getContext('2d');
});
const lowResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$lowResolutionLayer.value) return null;
    return $lowResolutionLayer.value.getContext('2d');
});

let originalPageSize: SizeType = {
    width: 0,
    height: 0,
};

const debouncedRenderPage = createDebounce(async (newPageSize: SizeType) => {
    await renderPage(newPageSize);
    isChangingSize.value = false;
}, 500);

onMounted(async () => {
    const page = await pdfStore.getPage(props.pageIndex);
    if (!page) return;

    originalPageSize = page.size;
    await renderPage(page.size);

    watch(page.viewport, async () => {
        await changePageSize(page.size);
    });
});
/**
 * changePageSize PDF 페이지의 크기를 변경하는 로직으로 아래의 과정을 거칩니다.
 * canvas확대/축소 (해상도가 낮아짐) -> 고해상도 canvas를 랜더링
 * @param newPageSize
 */
async function changePageSize(newPageSize: SizeType) {
    isChangingSize.value = true;
    resizeElement($pdfPage.value, newPageSize);
    renderLowResolutionLayer(newPageSize);
    debouncedRenderPage(newPageSize);
}

async function renderPage(pageSize: SizeType) {
    resizeElement($pdfPage.value, pageSize);
    resizeCanvas($selectionLayer.value.$el, pageSize);
    resizeCanvas($highlightLayer.value.$el, pageSize);

    await renderHighResolutionLayer(pageSize);
    await renderTextLayer(pageSize);
}
function renderLowResolutionLayer(pageSize: SizeType) {
    const originCanvas = copyCanvas($highResolutionLayer.value);

    resizeCanvas($lowResolutionLayer.value, pageSize);
    rescaleCanvas($lowResolutionLayer.value, pageSize, originalPageSize);

    if (originCanvas) {
        drawLowResolutionLayer(originCanvas);
    }
}
async function renderHighResolutionLayer(pageSize: SizeType) {
    const page = await pdfStore.getPage(props.pageIndex);
    if (!page) return;

    resizeCanvas($highResolutionLayer.value, pageSize);

    originalPageSize = pageSize;

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

async function renderTextLayer(pageSize: SizeType) {
    const page = await pdfStore.getPage(props.pageIndex);

    if (!page || !$textLayer.value) return;

    resizeElement($textLayer.value, pageSize);
    const fragment = await page.createTextLayerFragment();
    $textLayer.value.innerHTML = '';
    $textLayer.value.appendChild(fragment);
    page.addTokenInfo($textLayer.value);
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
