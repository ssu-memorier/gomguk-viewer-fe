<template>
    <a :href="AUTH.BASE + AUTH.URL.LOGOUT"> {{ AUTH.VIEW.LOGOUT }} </a>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
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
