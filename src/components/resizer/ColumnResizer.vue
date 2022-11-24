<template>
    <div>
        <span @mousedown="resizeStart" @mousemove="resize" @mouseup="resizeEnd"
            >---</span
        >
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const isResizing = ref<boolean>(false);
function resizeStart() {
    isResizing.value = true;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;
}
function resizeEnd() {
    isResizing.value = false;
}
</script>
