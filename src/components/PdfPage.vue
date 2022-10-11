<template>
    <div ref="$pdfPage" class="pdfPage card">
        <canvas ref="$selectionLayer" class="selectionLayer"></canvas>
        <canvas ref="$pdfLayer" class="pdfLayer"></canvas>
        <div ref="$textLayer" class="textLayer"></div>
    </div>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import { usePdfStore } from '@/store/pdf';
import { PageViewport, PDFPageProxy } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';
import TOKEN from '@/constants/TOKEN';
import { useSelectionStore } from '@/store/selection';
import Line from '@/classes/Line';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});
const pdfStore = usePdfStore();
const selectionStore = useSelectionStore();
const $pdfPage = ref<HTMLDivElement>();
const $pdfLayer = ref<HTMLCanvasElement>();
const $textLayer = ref<HTMLDivElement>();
const $selectionLayer = ref<HTMLCanvasElement>();
const selectionLayerCtx = ref<CanvasRenderingContext2D | null>();
let page: PDFPageProxy;
let viewport: PageViewport;
let ctx: CanvasRenderingContext2D;

onMounted(async () => {
    ctx = $pdfLayer.value?.getContext('2d') as CanvasRenderingContext2D;
    page = await pdfStore.getPage(props.pageIndex);
    const options = { scale: pdfStore.scale };

    await renderPage(page, options);

    if (!$textLayer.value) return;
    if (!$selectionLayer.value) return;

    selectionLayerCtx.value = $selectionLayer.value.getContext('2d');
    const nodes = [...$textLayer.value.childNodes];

    addTokenInfo(nodes);
});

selectionStore.$subscribe((_, state) => {
    // document.addEventListener('selectionchange', () => {
    // const selection = window.getSelection();
    // const range = selection.getRangeAt(0);
    const { range } = state;
    if (!range || range.collapsed) {
        clearSelectionLayer();
        return;
    }
    const { startContainer, startOffset, endContainer, endOffset } = range;
    if (
        startContainer.nodeName !== '#text' ||
        endContainer.nodeName !== '#text'
    )
        return;

    clearSelectionLayer();

    const selectedTokens = getSelectedTokens(range);
    const lineMap = getLineMap(selectedTokens);
    const $startToken = startContainer.parentElement;
    const $endToken = endContainer.parentElement;

    if (!$startToken || !$endToken) return;

    const startLineNum = getLineNum($startToken);
    const endLineNum = getLineNum($endToken);
    const startLine = lineMap.get(startLineNum);
    const endLine = lineMap.get(endLineNum);

    if (!startLine || !endLine) return;

    const startGap = getFirstLineStartOffset(startContainer, startOffset);
    const endGap = getLastLineEndOffset(endContainer, endOffset);
    startLine.setLeft(startLine.left + startGap);
    endLine.setRight(endLine.right - endGap);

    const selectedLines = [...lineMap.values()];
    drawSelectionLines(selectedLines);
});
/**
 * page를 랜더링 합니다.
 * @param page pdf의 한 페이지에 해당하는 객체입니다.
 * @param options 랜더링 옵션 (scale 등)
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
    await renderPdfLayer(page, viewport, ctx);
    await renderTextLayer(page, viewport);
}
function setPageSize(viewport: PageViewport) {
    if (!$pdfPage.value || !$pdfLayer.value || !$selectionLayer.value) return;

    $pdfPage.value.style.width = viewport.width + 'px';
    $pdfPage.value.style.height = viewport.height + 'px';
    $pdfLayer.value.width = viewport.width;
    $pdfLayer.value.height = viewport.height;
    $selectionLayer.value.width = viewport.width;
    $selectionLayer.value.height = viewport.height;
}

/**
 * pdf layer를 캔버스에 랜더링 합니다.
 * @param page pdf의 한 페이지에 해당하는 객체입니다.
 * @param canvasContext 페이지를 그릴 캔버스의 컨텍스트입니다.
 * @param viewport 페이지의 크기 정보입니다. (width,height)
 */
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
 * text layer를 랜더링하여 텍스트를 선택할 수 있게 합니다.
 * @param page pdf의 한 페이지에 해당하는 객체입니다.
 * @param viewport 페이지의 크기 정보입니다. (width,height)
 */
async function renderTextLayer(page: PDFPageProxy, viewport: PageViewport) {
    if (!$textLayer.value || !$pdfLayer.value) return;

    $textLayer.value.innerHTML = '';
    $textLayer.value.style.left = $pdfLayer.value.offsetHeight + 'px';
    $textLayer.value.style.left = $pdfLayer.value.offsetTop + 'px';

    pdfjsLib.renderTextLayer({
        textContent: await page.getTextContent(),
        container: $textLayer.value,
        viewport: viewport,
    });
}
function clearSelectionLayer() {
    if (!selectionLayerCtx.value || !$selectionLayer.value) return;

    const ctx = selectionLayerCtx.value;

    ctx.clearRect(
        0,
        0,
        $selectionLayer.value.width,
        $selectionLayer.value.height
    );
}
function drawSelectionLines(lines: Line[]) {
    if (!selectionLayerCtx.value || !$selectionLayer.value) return;

    const ctx = selectionLayerCtx.value;
    lines.forEach((line) => {
        const { left, top, right, bottom } = line;
        ctx.beginPath();
        ctx.rect(left, top, right - left, bottom - top);
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}
function getFirstLineStartOffset(startContainer: Node, startOffset: number) {
    const beforeStartRange = new Range();
    beforeStartRange.setStart(startContainer, 0);
    beforeStartRange.setEnd(startContainer, startOffset);
    const { width } = beforeStartRange.getClientRects()[0];

    return width;
}

function getLastLineEndOffset(endContainer: Node, endOffset: number) {
    const afterEndRange = new Range();
    const wholeText = (endContainer as Text).wholeText;

    afterEndRange.setStart(endContainer, endOffset);
    afterEndRange.setEnd(endContainer, wholeText.length);

    const { width } = afterEndRange.getClientRects()[0];

    return width;
}

function getLineMap(tokens: HTMLElement[]) {
    return tokens.reduce((map, $token) => {
        const tokenInfo = $token.dataset;
        const lineNum = parseInt(
            tokenInfo[TOKEN.DATASET.LINE_NUM] as string,
            10
        );

        if (!map.has(lineNum)) {
            map.set(lineNum, new Line(lineNum));
        }
        map.get(lineNum)?.addToken($token);

        return map;
    }, new Map<number, Line>());
}

function getSelectedTokens(range: Range): HTMLElement[] {
    console.log(range);
    const selectedNodes = [...range.cloneContents().childNodes];
    const commonAncestorContainer = range.commonAncestorContainer;

    if (
        commonAncestorContainer.nodeName === '#text' &&
        commonAncestorContainer.parentElement
    ) {
        return [commonAncestorContainer.parentElement];
    }

    return selectedNodes
        .filter((node) => node.nodeName === 'SPAN')
        .map((node) => node as HTMLElement);
}

function getLineNum($token: HTMLElement): number {
    const lineNumData = $token.dataset[TOKEN.DATASET.LINE_NUM];

    if (!lineNumData) return -1;
    return parseInt(lineNumData, 10);
}

function addTokenInfo(nodes: Node[]) {
    if (!$textLayer.value) return;

    const textLayerRect = $textLayer.value.getBoundingClientRect();
    let lineNum = 1;

    nodes.forEach((node) => {
        const $node = node as HTMLElement;
        if ($node.nodeName === 'BR') {
            lineNum++;
        } else {
            const rect = $node.getBoundingClientRect();

            $node.dataset[TOKEN.DATASET.LINE_NUM] = `${lineNum}`;
            $node.dataset[TOKEN.DATASET.RIGHT] = `${
                rect.right - textLayerRect.left
            }`;
            $node.dataset[TOKEN.DATASET.BOTTOM] = `${
                rect.bottom - textLayerRect.top
            }`;
            $node.dataset[TOKEN.DATASET.LEFT] = `${
                rect.left - textLayerRect.left
            }`;
            $node.dataset[TOKEN.DATASET.TOP] = `${
                rect.top - textLayerRect.top
            }`;
        }
    });
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
