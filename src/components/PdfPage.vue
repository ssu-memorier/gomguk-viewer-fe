<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$pdfLayer" class="pdfLayer"></canvas>
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import { usePdfStore } from '@/store/pdf';
import { PageViewport, PDFPageProxy } from 'pdfjs-dist';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});
const pdfStore = usePdfStore();
const $pdfPage = ref<HTMLDivElement>();
const $pdfLayer = ref<HTMLCanvasElement>();
let page: PDFPageProxy;
let viewport: PageViewport;
let ctx: CanvasRenderingContext2D;

onMounted(async () => {
    ctx = $pdfLayer.value?.getContext('2d') as CanvasRenderingContext2D;
    page = await pdfStore.getPage(props.pageIndex);
    const option = { scale: pdfStore.scale };

    renderPage(page, option);
});

/**
 * page를 랜더링 합니다.
 * @param page pdf의 한 페이지에 해당하는 객체입니다.
 * @param canvasContext 페이지를 그릴 캔버스의 컨텍스트입니다.
 * @param viewport 페이지의 크기 정보입니다. (width,height)
 */
async function renderPage(
    page: PDFPageProxy,
    options: {
        scale: number;
    }
) {
    viewport = await page.getViewport(options);

    if (!page || !viewport || !ctx) {
        return;
    }

    setPageSize(viewport);
    renderPdfLayer(page, viewport, ctx);
}
function setPageSize(viewport: PageViewport) {
    if (!$pdfPage.value || !$pdfLayer.value) return;

    $pdfPage.value.style.width = viewport.width + 'px';
    $pdfPage.value.style.height = viewport.height + 'px';
    $pdfLayer.value.width = viewport.width;
    $pdfLayer.value.height = viewport.height;
}
async function renderPdfLayer(
    page: PDFPageProxy,
    viewport: PageViewport,
    canvasContext: CanvasRenderingContext2D
) {
    if ($pdfLayer.value) {
        $pdfLayer.value.width = viewport.width;
        $pdfLayer.value.height = viewport.height;
    }

    const renderContext = {
        canvasContext,
        viewport,
    };

    await page.render(renderContext).promise;
}

/**
 * TODO:
 *
 * 아래 코드는 textLayer를 추가할 때 사용할 예정입니다.
 * 이번 PR의 주 목적이 아니기 때문에 주석처리했고, copy기능을 구현하면서 제거할 예정입니다.
 * 따라서 textLayer 관련 코드는 무시하고 보시면 됩니다.
 *
 * import * as pdfjsLib from 'pdfjs-dist';
 * <div ref="$textLayer" class="textLayer"></div>
 * const $textLayer = ref<HTMLDivElement>();
 *
 * async function renderTextLayer(page: PDFPageProxy, viewport: PageViewport) {
 *    if (!$textLayer.value || !$pdfLayer.value) return;
 *
 *    $textLayer.value.innerHTML = '';
 *    $textLayer.value.style.left = $pdfLayer.value.offsetHeight + 'px';
 *    $textLayer.value.style.left = $pdfLayer.value.offsetTop + 'px';
 *
 *    pdfjsLib.renderTextLayer({
 *        textContent: await page.getTextContent(),
 *        container: $textLayer.value,
 *        viewport: viewport,
 *    });
 *}
 */
</script>

<style lang="scss" scoped>
.pdfPage {
    position: relative;
    margin: 0.5rem auto;
    .pdfLayer,
    .textLayer {
        position: absolute;
        left: 0;
        top: 0;
    }
    // .textLayer {
    //     text-align: initial;
    //     overflow: hidden;
    //     opacity: 0.2;
    //     line-height: 1;
    //     z-index: 10;
    //     width: 979px;
    //     height: 1267px;
    //     span,
    //     br {
    //         color: transparent;
    //         position: absolute;
    //         white-space: pre;
    //         transform-origin: 0% 0%;
    //         overflow: hidden;
    //         line-height: 100%;
    //         vertical-align: bottom;
    //     }
    //     span::selection,
    //     br::selection {
    //         color: transparent;
    //     }
    //     ::selection {
    //         background: green;
    //     }
    // }
}
</style>
