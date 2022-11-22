<template>
    <button @click="go(AUTH.BASE + AUTH.URL.LOGOUT)">
        <img src="@/assets/images/png/kakao_login_medium_narrow.png" />
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
