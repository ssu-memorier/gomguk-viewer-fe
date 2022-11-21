<template>
    <round-button>
        <img v-if="picture" :src="picture" />
        <img v-else src="@/assets/images/svg/user.svg" />
    </round-button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import RoundButton from '@/components/button/RoundButton.vue';

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
