<template>
    <button @click="toggleAuthMethod">
        <slot></slot>
    </button>
    <component :is="LoginView" v-show="isShow"></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginView from '@/views/LoginView.vue';

const isShow = ref<boolean>(false);

function toggleAuthMethod() {
    /**
     * TODO: 카카오와 구글 중 선택할 수 있는 view를 보여준다.
     */

    isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped></style>
