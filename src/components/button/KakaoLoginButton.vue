<template>
    <button @click="go(AUTH.BASE + AUTH.URL.LOGOUT)">
        {{ AUTH.PROVIDER.KAKAO }}
    </button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';

function go(url: string) {
    window.location.assign(url);
}
</script>

<style lang="scss" scoped></style>
