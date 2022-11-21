<template>
    <button>
        <img v-if="picture" :src="picture" />
        <img v-else src="@/assets/images/svg/user.svg" />
    </button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    picture: {
        type: String,
        required: false,
        validator(value: string) {
            const urlReg =
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;

            return urlReg.test(value);
        },
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
}
</style>
