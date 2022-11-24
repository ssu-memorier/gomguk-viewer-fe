<template>
    <div
        class="container"
        @mousemove="resize"
        @mouseup="resizeEnd"
        @mouseleave="resizeForceEnd"
        ref="$columnResizer"
        :style="{ height: (isFold ? props.min : h) + 'px' }"
        :class="{ unselectable: isResizing }"
    >
        <span class="handle" @mousedown.stop="resizeStart"></span>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

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
const isFold = ref<boolean>(false);
let isChangingSize = false;

watch(h, (value) => {
    if (value === props.min) {
        isFold.value = true;
    }
});
function resizeStart() {
    isResizing.value = true;
    isChangingSize = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;
    isChangingSize = true;
    isFold.value = false;
    const newHeight = props.base - evt.clientY + 18;
    if (newHeight > (props.max ?? 0)) return;
    if (newHeight < (props.min ?? 0)) return;
    h.value = newHeight;
}
function resizeEnd() {
    isResizing.value = false;
    if (!isChangingSize) {
        if (h.value === props.min) h.value = props.height;
        isFold.value = !isFold.value;
        isChangingSize = false;
    }
}
function resizeForceEnd() {
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
