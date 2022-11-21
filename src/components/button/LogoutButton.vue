<template>
    <div class="logout" @click="go(AUTH.BASE + AUTH.URL.LOGOUT)">
        <a> {{ AUTH.VIEW.LOGOUT }} </a>
    </div>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';

function go(url: string) {
    window.location.assign(url);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
.logout {
    padding: 1rem;
    background-color: $SURFACE-COLOR;
    box-shadow: $SHADOW__6DP;
    border-radius: $BORDER-RADIUS__16;

    a {
        border: 1px solid black;
        border-radius: $BORDER-RADIUS__16;
        text-decoration: none;
    }
}
</style>
