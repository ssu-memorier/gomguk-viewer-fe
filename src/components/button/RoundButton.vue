<template>
    <button :title="title">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        required: false,
    },
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';

button {
    aspect-ratio: 1 / 1;
    padding: 0.25rem;
    border: 0;
    border-radius: 50%;
    background-color: $SURFACE-COLOR;
    cursor: pointer;

    &:hover {
        background-color: $SURFACE-COLOR__HOVER;
    }
}
</style>
