<template>
    <button class="alert">
        <slot></slot>
    </button>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';
button {
    border: 1px solid $ALERT-COLOR;
    color: $ALERT-COLOR__DARK;
    background-color: $SURFACE-COLOR;
    border-radius: $BORDER-RADIUS__16;
    padding: 0.5rem 2rem;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: $ALERT-COLOR__DARK;
        border: 1px solid $ALERT-COLOR__DARK;
        color: $SURFACE-COLOR;
    }
}
</style>
