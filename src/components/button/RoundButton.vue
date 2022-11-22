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
    padding: 0.25rem;
    border: 0;
    border-radius: $BORDER-RADIUS__ROUND;
    background-color: $SURFACE-COLOR;
    cursor: pointer;

    &:hover {
        background-color: $SURFACE-COLOR__HOVER;
    }
}
</style>
