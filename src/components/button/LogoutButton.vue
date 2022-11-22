<template>
    <alert-button @click="changeLocation(AUTH.BASE + AUTH.URL.LOGOUT)">
        {{ AUTH.VIEW.LOGOUT }}
    </alert-button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
import AlertButton from '@/components/button/AlertButton.vue';
import changeLocation from '@/utils/changeLocation';
</script>

<style lang="scss" scoped></style>
