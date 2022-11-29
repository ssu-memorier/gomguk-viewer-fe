<template>
    <alert-button @click="userStore.logout">
        {{ AUTH.VIEW.LOGOUT }}
    </alert-button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
import AlertButton from '@/components/button/AlertButton.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
