<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$pdfLayer" class="pdfLayer"></canvas>
        <canvas
            ref="$lowResolutionLayer"
            class="lowResolutionLayer"
            :class="{ hide: !isRendering }"
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
import Page from '@/classes/Page';
import { PageViewport } from 'pdfjs-dist';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $pdfLayer = ref<HTMLCanvasElement>();
const $textLayer = ref<HTMLDivElement>();
const $selectionLayer = ref();
const $highlightLayer = ref();
const $lowResolutionLayer = ref<HTMLCanvasElement>();
const isRendering = ref<boolean>(false);

let page: Page | undefined;
const ctx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$pdfLayer.value) return null;
    return $pdfLayer.value.getContext('2d');
});
const lowResolutionCtx = computed<CanvasRenderingContext2D | null>(() => {
    if (!$lowResolutionLayer.value) return null;
    return $lowResolutionLayer.value.getContext('2d');
});

onMounted(async () => {
    page = await pdfStore.getPage(props.pageIndex);
    if (
        !page ||
        !$lowResolutionLayer.value ||
        !$pdfLayer.value ||
        !$textLayer.value
    )
        return;

    if (!page.viewport.value) return;

    const { width, height } = page.viewport.value;
    setPageSize(width, height);
    await page.renderPdfLayer($pdfLayer.value);
    await renderTextLayer();

    watch(page.viewport, async (newViewport, oldViewport) => {
        if (!newViewport || !oldViewport) return;

        isRendering.value = true;
        await scaleChange(newViewport, oldViewport);
        isRendering.value = false;
    });
});

async function scaleChange(viewport: PageViewport, oldViewport: PageViewport) {
    if (
        !page ||
        !ctx.value ||
        !lowResolutionCtx.value ||
        !$pdfLayer.value ||
        !$textLayer.value
    )
        return;

    const originScaleCanvas = copyCanvas(ctx.value);

    const { width, height } = viewport;
    setPageSize(width, height);

    drawLowResolutionLayer(originScaleCanvas, viewport, oldViewport);
    await drawHighResolutionLayer(viewport);

    await renderTextLayer();
}
function setPageSize(width: number, height: number) {
    if (
        !$pdfPage.value ||
        !$pdfLayer.value ||
        !$selectionLayer.value ||
        !$textLayer.value ||
        !$lowResolutionLayer.value
    )
        return;

    $pdfPage.value.style.width = width + 'px';
    $pdfPage.value.style.height = height + 'px';
    $pdfLayer.value.width = width;
    $pdfLayer.value.height = height;
    $lowResolutionLayer.value.width = width;
    $lowResolutionLayer.value.height = height;
    $selectionLayer.value.$el.width = width;
    $selectionLayer.value.$el.height = height;
    $highlightLayer.value.$el.width = width;
    $highlightLayer.value.$el.height = height;
    $textLayer.value.style.width = width + 'px';
    $textLayer.value.style.height = height + 'px';
}

function copyCanvas(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const newCanvas = document.createElement('canvas');

    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.getContext('2d')?.putImageData(imgData, 0, 0);

    return newCanvas;
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
    if (!page || !ctx.value) return;

    const newCanvas = document.createElement('canvas');
    newCanvas.width = viewport.width;
    newCanvas.height = viewport.height;
    await page.renderPdfLayer(newCanvas);

    // 고해상도 스케일 pdf 그림
    ctx.value.drawImage(newCanvas, 0, 0);
}

async function renderTextLayer() {
    if (!page || !$textLayer.value) return;

    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
}
</script>

<style lang="scss" scoped>
.hide {
    visibility: hidden;
}
.pdfPage {
    position: relative;
    margin: 0 auto 1rem auto;
    .pdfLayer,
    .textLayer,
    .selectionLayer,
    .highlightLayer,
    .tempLayer {
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
