<template>
    <button @click="showAuthMethod">
        {{ props.label }}
    </button>
    <component :is="LoginView" v-show="isShow"></component>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import LoginView from '@/views/LoginView.vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
});
const isShow = ref<boolean>(false);

function showAuthMethod() {
    /**
     * TODO: 카카오와 구글 중 선택할 수 있는 view를 보여준다.
     */
}
</script>

<style lang="scss" scoped></style>
