<template>
    <div
        class="columnResizer"
        @mousemove="resize"
        @mouseup="resizeEnd"
        ref="$columnResizer"
    >
        <div :style="{ height: topHeight + 'px' }">
            <slot name="top"></slot>
        </div>
        <div
            ref="$resizer"
            class="resizer"
            :style="{
                transform: `translateY(${topHeight - RESIZER.LEN / 2}px)`,
            }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <div :style="{ height: bottomHeight + 'px' }">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import RESIZER from '@/constants/RESIZER';

const props = defineProps({
    topPercent: {
        type: Number,
        validator(value: number) {
            return 0 < value && value < 1;
        },
    },
});
const $resizer = ref();
const $columnResizer = ref();
const boxHeight = ref<number>(0);
const boxOffset = ref<number>(0);
const topPercent = ref<number>(props.topPercent ?? 0.5);
const isResizing = ref<boolean>(false);
const topHeight = computed(() => boxHeight.value * topPercent.value);
const bottomHeight = computed(() => boxHeight.value - topHeight.value);

onMounted(() => {
    const rect = $columnResizer.value.getBoundingClientRect();
    boxHeight.value = rect.height;
    boxOffset.value = rect.y;
});

window.addEventListener('resize', () => {
    boxHeight.value = $columnResizer.value.getBoundingClientRect().height;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    topPercent.value = (evt.clientY - boxOffset.value) / boxHeight.value;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/constants/RESIZER';
.columnResizer {
    position: relative;
    display: flex;
    flex-direction: column;
}
div.resizer {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: $RESIZER_LEN;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: ns-resize;
    div.line {
        height: $RESIZER_LINE_LEN;
        width: 100%;
        background-color: lightgray;
        transition: 0.3s;
    }
    &:hover {
        div.line {
            height: $RESIZER_LEN;
            width: 100%;
        }
    }
}
</style>
