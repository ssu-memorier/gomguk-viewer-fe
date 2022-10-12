<template>
    <canvas ref="$selectionLayer" class="selectionLayer"></canvas>
</template>

<script setup lang="ts">
/**
 * SelectionLayer는 pdf에서 selection된 영역을 그리는 레이어 컴포넌트 입니다.
 */
import { defineProps, ref, onMounted } from 'vue';
import { useSelectionStore } from '@/store/selection';
import Line from '@/classes/Line';
import getLineNum from '@/utils/getLineNum';
import hasText from '@/utils/hasText';
import getLeftGap from '@/utils/line/getLeftGap';
import getRightGap from '@/utils/line/getRightGap';
import getSelectedTokens from '@/utils/getSelectedTokens';
import getLineMap from '@/utils/line/getLineMap';

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

selectionStore.$subscribe(() => {
    const { selectedPageIndex, isSelectionExist, range } = selectionStore;

    if (!isSelectionExist) {
        clearSelection();
        return;
    }

    if (selectedPageIndex !== props.pageIndex) {
        clearSelection();
        return;
    }

    if (!range) return;
    if (!hasText(range)) return;

    clearSelection();
    drawSelection(range);
});

function clearSelection() {
    if (!ctx.value || !$selectionLayer.value) return;

    ctx.value.clearRect(
        0,
        0,
        $selectionLayer.value.width,
        $selectionLayer.value.height
    );
}

function drawSelection(range: Range) {
    const { startContainer, startOffset, endContainer, endOffset } = range;
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

    const startGap = getLeftGap(startContainer, startOffset);
    const endGap = getRightGap(endContainer, endOffset);

    startLine.setLeft(startLine.left + startGap);
    endLine.setRight(endLine.right - endGap);

    const selectedLines = [...lineMap.values()];
    drawLines(selectedLines);
}
function drawLines(lines: Line[]) {
    lines.forEach((line) => {
        if (!ctx.value) return;

        const { left, top, width, height } = line;
        ctx.value.beginPath();
        ctx.value.rect(left, top, width, height);
        ctx.value.fillStyle = 'red';
        ctx.value.fill();
    });
}
</script>

<style lang="scss" scoped>
.selectionLayer {
    z-index: 100;
    opacity: 0.5;
}
</style>
