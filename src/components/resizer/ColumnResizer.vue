<template>
    <div
        class="container"
        @mousemove="resize"
        @mouseup="resizeEnd"
        @mouseleave="resizeEnd"
        ref="$columnResizer"
        :style="{ height: h + 'px' }"
        :class="{ unselectable: isResizing }"
    >
        <span class="handle" @mousedown.stop="resizeStart"></span>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue';
const isResizing = ref<boolean>(false);
const $columnResizer = ref();
const h = ref<number>(200);

const props = defineProps({
    base: {
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
        required: false,
    },
});

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
    isResizing.value = false;
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
</style>
