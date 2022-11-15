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
    isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped></style>
