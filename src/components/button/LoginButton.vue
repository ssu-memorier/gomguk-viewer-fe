<template>
    <button @click="toggleAuthMethod">
        <slot></slot>
    </button>
    <div class="viewBox card" v-show="isShow">
        <component :is="LoginView" class="loginView"></component>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginView from '@/views/LoginView.vue';

const isShow = ref<boolean>(false);

function toggleAuthMethod() {
    isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped>
.viewBox {
    margin-top: 20px;
    left: 100%;
    margin-left: -200px;
    position: relative;
    width: 200px;
    height: 100px;
    .loginView {
        position: absolute;
        right: 0px;
    }
}
</style>
