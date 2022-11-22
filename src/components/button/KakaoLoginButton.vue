<template>
    <button @click="go(AUTH.BASE + AUTH.URL.KAKAO_LOGIN)">
        <img src="@/assets/images/png/kakao-login.png" />
    </button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';

function go(url: string) {
    window.location.assign(url);
}
</script>

<style lang="scss" scoped>
button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>
