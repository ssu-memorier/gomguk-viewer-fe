<template>
    <button @click="changeLocation(AUTH.BASE + AUTH.URL.KAKAO_LOGIN)">
        <img src="@/assets/images/png/kakao-login.png" />
    </button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
import changeLocation from '@/utils/changeLocation';
</script>

<style lang="scss" scoped>
button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>
