<template>
    <canvas ref="$highlightLayer" class="highlightLayer"></canvas>
</template>

<script setup lang="ts">
/**
 * HighlightLayer는 pdf의 Highlight 영역을 그리는 레이어 컴포넌트 입니다.
 */
import { defineProps, ref, onMounted, computed, watchEffect } from 'vue';
import { useHighlightStore } from '@/store/highlight';
import Line from '@/classes/Line';
import Color from '@/classes/Color';

const props = defineProps({
    pageNum: {
        type: Number,
        required: true,
    },
});
const highlightStore = useHighlightStore();
const $highlightLayer = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D | null>(null);
const highlightsInPage = computed(() => {
    return highlightStore.highlightList.filter(
        (h) => h.pageNum === props.pageNum
    );
});
onMounted(async () => {
    if (!$highlightLayer.value) return;

    ctx.value = $highlightLayer.value.getContext('2d');

    watchEffect(() => {
        clearSelectionLayer();
        highlightsInPage.value.forEach((h) => {
            drawLines(h.lines as Line[], h.color);
        });
    });
});

function clearSelectionLayer() {
    if (!ctx.value || !$highlightLayer.value) return;

    ctx.value.clearRect(
        0,
        0,
        $highlightLayer.value.width,
        $highlightLayer.value.height
    );
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
