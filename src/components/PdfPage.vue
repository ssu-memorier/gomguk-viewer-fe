<template>
    <div class="pdfPage">
        <canvas ref="$pdfView"></canvas>
        <div role="presentation" class="textLayer"></div>
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import { usePdfStore } from '@/store/pdf';
import { PageViewport, PDFPageProxy } from 'pdfjs-dist';
import { PdfState } from '@/Interface/PdfState';
const props = defineProps({
    pageNum: {
        type: Number,
        required: true,
    },
});
const pdfStore = usePdfStore();
const $pdfView = ref<HTMLCanvasElement>();
let page: PDFPageProxy | undefined;
let viewport: PageViewport | undefined;
let ctx: CanvasRenderingContext2D | undefined;
/**
 * pdfStore의 doc을 구독합니다. doc은 pdf의 각 페이지와 메타데이터를 불러오는 역할을 합니다.
 * 아래 코드에선 doc이 변경되면 페이지를 다시 랜더링하도록 하고 있습니다.
 */
onMounted(async () => {
    if (!pdfStore.doc) return;
    if (!page) {
        page = await pdfStore.doc.getPage(props.pageNum);
    }

    await renderPage(page, pdfStore.scale);
});

pdfStore.$subscribe('doc', async (state: PdfState) => {
    if (!state.doc) return;

    page = await state.doc.getPage(props.pageNum);
    await renderPage(page, state.scale);
});

/**
 * page를 랜더링 합니다.
 * @param page pdf의 한 페이지에 해당하는 객체입니다.
 * @param canvasContext 페이지를 그릴 캔버스의 컨텍스트입니다.
 * @param viewport 페이지의 크기 정보입니다. (width,height)
 */
async function renderPage(page: PDFPageProxy | undefined, scale: number) {
    if (!page) return;
    if (!viewport) {
        viewport = await page?.getViewport({ scale });
    }
    if (!ctx) {
        ctx = $pdfView.value?.getContext('2d') as CanvasRenderingContext2D;
    }

    if ($pdfView.value) {
        $pdfView.value.width = viewport.width;
        $pdfView.value.height = viewport.height;
    }

    const renderContext = {
        canvasContext: ctx,
        viewport,
    };
    const renderTask = page.render(renderContext);
    if (renderTask) {
        await renderTask.promise;
    }
}
</script>

<style lang="scss" scoped>
div.pdfPage {
    position: relative;
    display: inline-block;
    width: fit-content;
    border: 1px solid black;

    canvas {
        left: 0;
        top: 0;
    }
}
</style>
