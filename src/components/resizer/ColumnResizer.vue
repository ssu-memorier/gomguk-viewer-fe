<template>
    <div
        class="columnResizer"
        @mousemove="resize"
        @mouseup="resizeEnd"
        :style="{ height: props.boxHeight + 'px' }"
        ref="$columnResizer"
    >
        <div class="top" :style="{ height: topHeight + 'px' }">
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
        <div class="bottom" :style="{ height: bottomHeight + 'px' }">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import RESIZER from '@/constants/RESIZER';

const props = defineProps({
    boxHeight: {
        type: Number,
        required: true,
    },
    topPercent: {
        type: Number,
        validator(value: number) {
            return 0 < value && value < 1;
        },
    },
});
const $resizer = ref();
const $columnResizer = ref();
const boxOffset = ref<number>(0);
const topPercent = ref<number>(props.topPercent ?? 0.5);
const isResizing = ref<boolean>(false);
const topHeight = computed(() => props.boxHeight * topPercent.value);
const bottomHeight = computed(() => props.boxHeight - topHeight.value);

onMounted(() => {
    const rect = $columnResizer.value.getBoundingClientRect();

    boxOffset.value = rect.y;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    topPercent.value = (evt.clientY - boxOffset.value) / props.boxHeight;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/constants/RESIZER';
.columnResizer {
    position: relative;
    display: flex;
    flex-direction: column;

    .top,
    .bottom {
        position: relative;
    }
}
div.resizer {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: $RESIZER_LEN;
    display: flex;
    flex-direction: column;
    justify-content: center;
    will-change: transform;
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
