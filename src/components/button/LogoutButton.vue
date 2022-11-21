<template>
    <div class="logout" @click="go(AUTH.BASE + AUTH.URL.LOGOUT)">
        <alert-button>{{ AUTH.VIEW.LOGOUT }}</alert-button>
    </div>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
import AlertButton from '@/components/button/AlertButton.vue';
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
}
</style>
