<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$highResolutionLayer" class="highResolutionLayer"></canvas>
        <canvas
            ref="$lowResolutionLayer"
            class="lowResolutionLayer"
            :class="{ show: isScaleChanging }"
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
import { PageViewport } from 'pdfjs-dist';
import SelectionLayer from '@/components/layer/SelectionLayer.vue';
import HighlightLayer from '@/components/layer/HighlightLayer.vue';
import copyCanvas from '@/utils/copyCanvas';
import Page from '@/classes/Page';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});

const isScaleChanging = ref<boolean>(false);
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $highResolutionLayer = ref<HTMLCanvasElement>();
const $lowResolutionLayer = ref<HTMLCanvasElement>();
const $textLayer = ref<HTMLDivElement>();
const $selectionLayer = ref();
const $highlightLayer = ref();

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
    page = await pdfStore.getPage(props.pageIndex);
    if (!page || !page.viewport.value) return;

    const { width, height } = page.viewport.value;

    setPageSize(width, height);
    await drawHighResolutionLayer(page.viewport.value);
    await renderTextLayer();

    watch(page.viewport, async (newViewport, oldViewport) => {
        if (!newViewport || !oldViewport) return;

        isScaleChanging.value = true;
        await scaleChange(newViewport, oldViewport);
        isScaleChanging.value = false;
    });
});
/**
 * scaleChange는 PDF 페이지의 스케일을 변경하는 로직으로 아래의 과정을 거칩니다.
 * canvas확대/축소 (해상도가 낮아짐) -> 고해상도 canvas를 로딩
 * @param newViewport
 * @param oldViewport
 */
async function scaleChange(
    newViewport: PageViewport,
    oldViewport: PageViewport
) {
    if (!highResolutionCtx.value) return;

    const originScaleCanvas = copyCanvas(highResolutionCtx.value);
    const { width, height } = newViewport;

    setPageSize(width, height);
    drawLowResolutionLayer(originScaleCanvas, newViewport, oldViewport);
    await drawHighResolutionLayer(newViewport);
    await renderTextLayer();
}
function setPageSize(width: number, height: number) {
    if (
        !$pdfPage.value ||
        !$highResolutionLayer.value ||
        !$selectionLayer.value ||
        !$textLayer.value ||
        !$lowResolutionLayer.value
    )
        return;

    $pdfPage.value.style.width = width + 'px';
    $pdfPage.value.style.height = height + 'px';
    $highResolutionLayer.value.width = width;
    $highResolutionLayer.value.height = height;
    $lowResolutionLayer.value.width = width;
    $lowResolutionLayer.value.height = height;
    $selectionLayer.value.$el.width = width;
    $selectionLayer.value.$el.height = height;
    $highlightLayer.value.$el.width = width;
    $highlightLayer.value.$el.height = height;
    $textLayer.value.style.width = width + 'px';
    $textLayer.value.style.height = height + 'px';
}

function drawLowResolutionLayer(
    originScaleCanvas: HTMLCanvasElement,
    viewport: PageViewport,
    oldViewport: PageViewport
) {
    if (!lowResolutionCtx.value) return;

    lowResolutionCtx.value.scale(
        viewport.width / oldViewport.width,
        viewport.height / oldViewport.height
    );
    lowResolutionCtx.value.drawImage(originScaleCanvas, 0, 0);
}

async function drawHighResolutionLayer(viewport: PageViewport) {
    if (!page || !highResolutionCtx.value) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;
    await page.renderPdfLayer(tempCanvas);

    highResolutionCtx.value.drawImage(tempCanvas, 0, 0);
}

async function renderTextLayer() {
    if (!page || !$textLayer.value) return;

    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
}
</script>

<style lang="scss" scoped>
.pdfPage {
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
