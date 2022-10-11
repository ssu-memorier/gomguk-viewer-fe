<template>
    <canvas ref="$selectionLayer" class="selectionLayer"></canvas>
</template>

<script setup lang="ts">
/**
 * pdfPage.vue는 pdf의 각 페이지를 나타내는 파일입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import TOKEN from '@/constants/TOKEN';
import { useSelectionStore } from '@/store/selection';
import Line from '@/classes/Line';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
});
const selectionStore = useSelectionStore();
const $selectionLayer = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(async () => {
    if (!$selectionLayer.value) return;

    ctx.value = $selectionLayer.value.getContext('2d');
});

selectionStore.$subscribe((_, state) => {
    const { range } = state;

    if (!range || range.collapsed) {
        clearCanvas();
        return;
    }
    if (state.selectedPageIndex !== props.pageIndex) return;

    const { startContainer, startOffset, endContainer, endOffset } = range;
    if (
        startContainer.nodeName !== '#text' ||
        endContainer.nodeName !== '#text'
    )
        return;

    clearCanvas();

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

function clearCanvas() {
    if (!ctx.value || !$selectionLayer.value) return;

    ctx.value.clearRect(
        0,
        0,
        $selectionLayer.value.width,
        $selectionLayer.value.height
    );
}
function drawSelectionLines(lines: Line[]) {
    lines.forEach((line) => {
        if (!ctx.value) return;

        const { left, top, right, bottom } = line;
        ctx.value.beginPath();
        ctx.value.rect(left, top, right - left, bottom - top);
        ctx.value.fillStyle = 'red';
        ctx.value.fill();
    });
}
function getFirstLineStartOffset(startContainer: Node, startOffset: number) {
    const beforeStartRange = new Range();
    beforeStartRange.setStart(startContainer, 0);
    beforeStartRange.setEnd(startContainer, startOffset);
    const { width } = beforeStartRange.getBoundingClientRect();

    return width;
}

function getLastLineEndOffset(endContainer: Node, endOffset: number) {
    const afterEndRange = new Range();
    const wholeText = (endContainer as Text).wholeText;

    afterEndRange.setStart(endContainer, endOffset);
    afterEndRange.setEnd(endContainer, wholeText.length);

    const { width } = afterEndRange.getBoundingClientRect();

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
</script>

<style lang="scss" scoped>
.selectionLayer {
    z-index: 100;
    opacity: 0.5;
}
</style>
