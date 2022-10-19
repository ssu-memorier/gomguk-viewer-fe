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

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});

type Size = {
    width: number;
    height: number;
};
const isChangingSize = ref<boolean>(false);
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $highResolutionLayer = ref<HTMLCanvasElement>();
const $lowResolutionLayer = ref<HTMLCanvasElement>();
const $textLayer = ref<HTMLDivElement>();
const $selectionLayer = ref();
const $highlightLayer = ref();
let originalPageSize: Size = {
    width: 0,
    height: 0,
};

const debouncedHighResolutionRender = createDebounce(
    async (newPageSize: Size) => {
        $highResolutionLayer.value.width = newPageSize.width;
        $highResolutionLayer.value.height = newPageSize.height;
        $selectionLayer.value.$el.width = newPageSize.width;
        $selectionLayer.value.$el.height = newPageSize.height;
        $highlightLayer.value.$el.width = newPageSize.width;
        $highlightLayer.value.$el.height = newPageSize.height;
        $textLayer.value.style.width = Math.floor(newPageSize.width) + 'px';
        $textLayer.value.style.height = Math.floor(newPageSize.height) + 'px';

        originalPageSize = newPageSize;
        await drawHighResolutionLayer(newPageSize);
        if ($highResolutionLayer.value) {
            isChangingSize.value = false;
            drawLowResolutionLayer($highResolutionLayer.value);
        }
        await renderTextLayer();
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
    page = await pdfStore.getPage(props.pageIndex);
    if (!page || !page.viewport.value || !$highResolutionLayer.value) return;

    originalPageSize = page.size;

    setPageSize(originalPageSize);
    await drawHighResolutionLayer(originalPageSize);
    await renderTextLayer();

    watch(page.viewport, async (newViewport) => {
        if (!newViewport) return;

        isChangingSize.value = true;
        const newPageSize: Size = {
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
async function changePageSize(newPageSize: Size) {
    if (
        !highResolutionCtx.value ||
        !lowResolutionCtx.value ||
        !$lowResolutionLayer.value
    )
        return;

    const originScaleCanvas = copyCanvas(highResolutionCtx.value);
    const { width, height } = newPageSize;

    $lowResolutionLayer.value.width = width;
    $lowResolutionLayer.value.height = height;
    $pdfPage.value.style.width = Math.floor(width) + 'px';
    $pdfPage.value.style.height = Math.floor(height) + 'px';
    lowResolutionCtx.value.scale(
        newPageSize.width / originalPageSize.width,
        newPageSize.height / originalPageSize.height
    );
    drawLowResolutionLayer(originScaleCanvas);
    debouncedHighResolutionRender(newPageSize);
}
function setPageSize({ width, height }: Size) {
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
    $lowResolutionLayer.value.width = width;
    $lowResolutionLayer.value.height = height;
    $highResolutionLayer.value.width = width;
    $highResolutionLayer.value.height = height;
    $selectionLayer.value.$el.width = width;
    $selectionLayer.value.$el.height = height;
    $highlightLayer.value.$el.width = width;
    $highlightLayer.value.$el.height = height;
    $textLayer.value.style.width = width + 'px';
    $textLayer.value.style.height = height + 'px';
}

function drawLowResolutionLayer(originScaleCanvas: HTMLCanvasElement) {
    if (!lowResolutionCtx.value) return;

    lowResolutionCtx.value.drawImage(originScaleCanvas, 0, 0);
}

async function drawHighResolutionLayer({ width, height }: Size) {
    if (!page || !highResolutionCtx.value) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
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
