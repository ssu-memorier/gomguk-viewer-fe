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
<style lang="scss" scoped></style>
