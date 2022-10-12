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
    const {
        selectedPageIndex,
        isSelectionExist,
        hasSelectedText,
        selectedLines,
    } = selectionStore;
    if (!isSelectionExist) {
        clearSelectionLayer();
        return;
    }

    if (selectedPageIndex !== props.pageIndex) {
        clearSelectionLayer();
        return;
    }

    if (!hasSelectedText) return;
    clearSelectionLayer();

    if (!selectedLines) return;
    drawLines(selectedLines);
});

function clearSelectionLayer() {
    if (!ctx.value || !$selectionLayer.value) return;

    ctx.value.clearRect(
        0,
        0,
        $selectionLayer.value.width,
        $selectionLayer.value.height
    );
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
