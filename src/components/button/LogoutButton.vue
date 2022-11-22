<template>
    <alert-button @click="go(AUTH.BASE + AUTH.URL.LOGOUT)">
        {{ AUTH.VIEW.LOGOUT }}
    </alert-button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
import AlertButton from '@/components/button/AlertButton.vue';
function go(url: string) {
    window.location.assign(url);
}
</script>

<style lang="scss" scoped></style>
