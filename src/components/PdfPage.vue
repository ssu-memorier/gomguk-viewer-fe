<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$pdfLayer" class="pdfLayer"></canvas>
        <canvas
            ref="$tempLayer"
            class="tempLayer"
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
import { defineProps, ref, onMounted } from 'vue';
import { usePdfStore } from '@/store/pdf';
import SelectionLayer from '@/components/layer/SelectionLayer.vue';
import HighlightLayer from '@/components/layer/HighlightLayer.vue';
import Page from '@/classes/Page';

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
const $tempLayer = ref<HTMLCanvasElement>();
const isRendering = ref<boolean>(false);

let page: Page | undefined;
let ctx: CanvasRenderingContext2D | null = null;
let tempCtx: CanvasRenderingContext2D | null = null;
onMounted(async () => {
    page = await pdfStore.getPage(props.pageIndex);
    if (!page || !$tempLayer.value || !$pdfLayer.value || !$textLayer.value)
        return;

    ctx = $pdfLayer.value.getContext('2d');
    tempCtx = $tempLayer.value.getContext('2d');

    const { width, height } = page.viewport;
    setPageSize(width, height);
    await page.renderPdfLayer($pdfLayer.value);
    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
});

pdfStore.$subscribe(async (_, state) => {
    page = await pdfStore.getPage(props.pageIndex);

    if (!page || !ctx || !tempCtx || !$pdfLayer.value || !$textLayer.value)
        return;

    isRendering.value = true;
    const prevCanvas = getCopiedCanvas(ctx, page.viewport);
    const oldViewport = page.viewport;

    page.updateViewport(state.viewportOption);

    const { width, height } = page.viewport;
    setPageSize(width, height);
    tempCtx.scale(
        page.viewport.width / oldViewport.width,
        page.viewport.height / oldViewport.height
    );

    tempCtx.drawImage(prevCanvas, 0, 0);
    // const oldViewport = page.viewport;
    // page.updateViewport(state.viewportOption);
    // const { width, height } = page.viewport;
    // setPageSize(width, height);

    // ctx.scale(
    //     page.viewport.width / oldViewport.width,
    //     page.viewport.height / oldViewport.height
    // );
    // ctx.drawImage(newCanvas, 0, 0);
    const newCanvas = document.createElement('canvas');
    newCanvas.width = page.viewport.width;
    newCanvas.height = page.viewport.height;
    await page.renderPdfLayer(newCanvas);

    // await page.renderPdfLayer($pdfLayer.value);
    ctx.drawImage(newCanvas, 0, 0);
    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
    isRendering.value = false;
});

function setPageSize(width: number, height: number) {
    if (
        !$pdfPage.value ||
        !$pdfLayer.value ||
        !$selectionLayer.value ||
        !$textLayer.value ||
        !$tempLayer.value
    )
        return;

    $pdfPage.value.style.width = width + 'px';
    $pdfPage.value.style.height = height + 'px';
    $pdfLayer.value.width = width;
    $pdfLayer.value.height = height;
    $tempLayer.value.width = width;
    $tempLayer.value.height = height;
    $selectionLayer.value.$el.width = width;
    $selectionLayer.value.$el.height = height;
    $highlightLayer.value.$el.width = width;
    $highlightLayer.value.$el.height = height;
    $textLayer.value.style.width = width + 'px';
    $textLayer.value.style.height = height + 'px';
}

function getCopiedCanvas(ctx, viewport) {
    const imgData = ctx.getImageData(0, 0, viewport.width, viewport.height);
    const newCanvas = document.createElement('canvas');
    newCanvas.width = viewport.width;
    newCanvas.height = viewport.height;
    newCanvas.getContext('2d')?.putImageData(imgData, 0, 0);

    return newCanvas;
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
