<template>
    <label>
        <input type="checkbox" />
        <span class="round">
            <slot></slot>
        </span>
    </label>
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

input[type='checkbox'] {
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;

    & + span {
        display: inline-block;
        height: 100%;
        width: 100%;
        box-shadow: $SHADOW__2DP;
        padding: 4px;

        &:hover {
            background-color: $SURFACE-COLOR__HOVER;
        }
    }
}
input[type='checkbox']:checked {
    & + span {
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        background-color: $SURFACE-COLOR__HOVER;
    }
}
label {
    cursor: pointer;
}
.round {
    border-radius: $BORDER-RADIUS__ROUND;
    user-select: none;
}
</style>
