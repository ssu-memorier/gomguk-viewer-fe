<template>
    <div
        class="rowResizer"
        @mousemove="resize"
        @mouseup="resizeEnd"
        ref="$rowResizer"
    >
        <div :style="{ width: leftWidth + 'px' }">
            <slot name="left"></slot>
        </div>
        <div
            ref="$resizer"
            class="resizer"
            :style="{
                transform: `translate(${leftWidth - RESIZER.LEN / 2}px)`,
            }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <div :style="{ width: rightWidth + 'px' }">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import RESIZER from '@/constants/RESIZER';

const props = defineProps({
    leftPercent: {
        type: Number,
        validator(value: number) {
            return 0 < value && value < 1;
        },
    },
});
const $resizer = ref();
const $rowResizer = ref();
const boxWidth = ref<number>(0);
const boxOffset = ref<number>(0);
const leftPercent = ref<number>(props.leftPercent ?? 0.5);
const isResizing = ref<boolean>(false);
const leftWidth = computed(() => boxWidth.value * leftPercent.value);
const rightWidth = computed(() => boxWidth.value - leftWidth.value);

onMounted(() => {
    const rect = $rowResizer.value.getBoundingClientRect();
    boxWidth.value = rect.width;
    boxOffset.value = rect.x;
});

window.addEventListener('resize', () => {
    boxWidth.value = $rowResizer.value.getBoundingClientRect().width;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    leftPercent.value = (evt.clientX - boxOffset.value) / boxWidth.value;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/constants/RESIZER';
.rowResizer {
    display: flex;
    flex-direction: row;

    & > :first-child,
    & > :last-child {
        width: 50%;
    }
}
div.resizer {
    position: absolute;
    z-index: 100;
    width: $RESIZER_LEN;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
