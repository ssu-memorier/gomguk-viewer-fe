<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$pdfLayer" class="pdfLayer"></canvas>
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
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import { usePdfStore } from '@/store/pdf';
import SelectionLayer from '@/components/SelectionLayer.vue';
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

let page: Page;

onMounted(async () => {
    page = await pdfStore.getPage(props.pageIndex);

    if (!$pdfLayer.value || !$textLayer.value) return;

    const { width, height } = page.viewport;
    setPageSize(width, height);
    await page.renderPdfLayer($pdfLayer.value);
    await page.renderTextLayer($textLayer.value);
    page.addTokenInfo($textLayer.value);
});

function setPageSize(width: number, height: number) {
    if (!$pdfPage.value || !$pdfLayer.value || !$selectionLayer.value) return;

    $pdfPage.value.style.width = width + 'px';
    $pdfPage.value.style.height = height + 'px';
    $pdfLayer.value.width = width;
    $pdfLayer.value.height = height;
    $selectionLayer.value.$el.width = width;
    $selectionLayer.value.$el.height = height;
}
</script>

<style lang="scss" scoped>
.pdfPage {
    position: relative;
    margin: 0 auto 1rem auto;
    .pdfLayer,
    .textLayer,
    .selectionLayer {
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
        width: 979px;
        height: 1267px;
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
            background: green;
        }
    }
    .selectionLayer {
        z-index: 100;
        opacity: 0.5;
    }
    .textLayer {
        z-index: 200;
        opacity: 0;
    }
}
</style>
