<template>
    <button>
        <img v-if="picture" :src="picture" />
        <img v-else src="@/assets/images/svg/user.svg" />
    </button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import isUrl from '@/utils/isUrl';

defineProps({
    picture: {
        type: String,
        required: false,
        validator: isUrl,
    },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';

button {
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    background-color: $PRIMARY-COLOR;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
