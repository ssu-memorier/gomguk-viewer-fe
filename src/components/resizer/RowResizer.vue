<template>
    <div
        class="rowResizer"
        @mousemove="resize"
        @mouseup="resizeEnd"
        :style="{ width: `${props.boxWidth}px` }"
        ref="$rowResizer"
    >
        <div class="left" :style="{ width: `${leftWidth}px` }">
            <slot name="left"></slot>
        </div>
        <div
            ref="$resizer"
            class="resizer"
            :style="{
                transform: `translateX(${leftWidth - RESIZER.LEN / 2}px)`,
            }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <div class="right" :style="{ width: `${rightWidth}px` }">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import RESIZER from '@/constants/RESIZER';

const props = defineProps({
    boxWidth: {
        type: Number,
        required: true,
    },
    leftPercent: {
        type: Number,
        validator(value: number) {
            return 0 < value && value < 1;
        },
    },
});
const $resizer = ref();
const $rowResizer = ref();
const boxOffset = ref<number>(0);
const leftPercent = ref<number>(props.leftPercent ?? 0.5);
const isResizing = ref<boolean>(false);
const leftWidth = computed(() => props.boxWidth * leftPercent.value);
const rightWidth = computed(() => props.boxWidth - leftWidth.value);

onMounted(() => {
    const rect = $rowResizer.value.getBoundingClientRect();
    boxOffset.value = rect.x;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    leftPercent.value = (evt.clientX - boxOffset.value) / props.boxWidth;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/constants/RESIZER';
.rowResizer {
    position: relative;
    display: flex;
    flex-direction: row;

    .left,
    .right {
        position: relative;
    }
}
div.resizer {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: $RESIZER_LEN;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    will-change: transform;
    cursor: ew-resize;
    div.line {
        width: $RESIZER_LINE_LEN;
        height: 100%;
        background-color: lightgray;
        transition: 0.3s;
    }
    &:hover {
        div.line {
            width: $RESIZER_LEN;
            height: 100%;
        }
    }
}
</style>
