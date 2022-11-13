<template>
    <canvas ref="$highlightLayer" class="highlightLayer"></canvas>
</template>

<script setup lang="ts">
/**
 * HighlightLayer는 pdf의 Highlight 영역을 그리는 레이어 컴포넌트 입니다.
 */
import { defineProps, ref, onMounted, computed, watch } from 'vue';
import { useHighlightStore } from '@/store/file/highlight';
import Line from '@/classes/Line';
import Color from '@/classes/Color';
import getSelectedLines from '@/utils/getSelectedLines';
import resizeCanvas from '@/utils/resizeCanvas';
import Highlight from '@/classes/Highlight';

const props = defineProps({
    pageIndex: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
});
const highlightStore = useHighlightStore();
const $highlightLayer = ref<HTMLCanvasElement>();
const ctx = computed(() => {
    if (!$highlightLayer.value) return null;
    return $highlightLayer.value.getContext('2d');
});
const highlightsInPage = computed(() => {
    return highlightStore.highlightList.filter(
        (h) => h.pageNum === props.pageIndex
    );
});

watch(highlightsInPage, () => {
    drawHighlight(highlightsInPage.value);
});
watch(props, () => {
    if (!$highlightLayer.value) return;

    const newSize = {
        width: props.width,
        height: props.height,
    };

    resizeCanvas($highlightLayer.value, newSize);
    drawHighlight(highlightsInPage.value);
});

function drawHighlight(highlights: Highlight[]) {
    highlights.forEach((h) => {
        const range = h.getRange();
        if (!range) return;

        const lines = getSelectedLines(range);
        drawLines(lines, h.color);
    });
}

function drawLines(lines: Line[], color: Color) {
    lines.forEach((line) => {
        if (!ctx.value) return;

        const { left, top, width, height } = line.rect;
        ctx.value.beginPath();
        ctx.value.rect(left, top, width, height);
        ctx.value.fillStyle = color.code;
        ctx.value.fill();
    });
}
</script>
<style>
.highlightLayer {
    opacity: 0.4;
}
</style>
