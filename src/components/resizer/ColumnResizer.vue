<template>
    <div
        class="container"
        @mousemove="resize"
        @mouseup="resizeEnd"
        @mouseleave="resizeForceEnd"
        ref="$columnResizer"
        :style="{ height: h + 'px' }"
        :class="{ unselectable: isResizing }"
    >
        <span
            class="handle"
            @mousedown.stop="resizeStart"
            @dblclick="fold"
        ></span>
        <div class="contents">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
    base: {
        type: Number,
        validator(value: number) {
            return value >= 0;
        },
        required: true,
    },
    height: {
        type: Number,
        validator(value: number) {
            return value >= 0;
        },
        required: true,
    },
    max: {
        type: Number,
        validator(value: number) {
            return value >= 0;
        },
        required: false,
    },
    min: {
        type: Number,
        validator(value: number) {
            return value >= 0;
        },
        default: 0,
    },
});
const isResizing = ref<boolean>(false);
const $columnResizer = ref();
const h = ref<number>(props.height);
const oldH = ref<number>(props.height);

function resizeStart() {
    isResizing.value = true;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;
    const newHeight = props.base - evt.clientY + 18;
    if (newHeight > (props.max ?? 0)) return;
    if (newHeight < (props.min ?? 0)) return;
    h.value = newHeight;
}
function resizeEnd() {
    if (!isResizing.value) return;

    isResizing.value = false;
}
function resizeForceEnd() {
    isResizing.value = false;
}
function fold() {
    if (h.value > props.min) {
        oldH.value = h.value;
        h.value = props.min;
    } else {
        h.value = oldH.value;
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/theme';
.container {
    box-sizing: border-box;
    &.unselectable {
        user-select: none;
    }
}
span.handle {
    display: inline-block;
    border-radius: $BORDER-RADIUS__ROUND;
    height: 8px;
    width: 60px;
    background-color: #eee;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
}
div.contents {
    height: calc(100% - 1rem - 8px);
}
</style>
