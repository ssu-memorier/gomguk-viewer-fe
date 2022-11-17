<template>
    <div class="loginView view">
        <menu>
            <a :href="AUTH.BASE + AUTH.URL.KAKAO_LOGIN">
                {{ AUTH.PROVIDER.KAKAO }}
            </a>
            <a :href="AUTH.BASE + AUTH.URL.GOOGLE_LOGIN">
                {{ AUTH.PROVIDER.GOOGLE }}
            </a>
        </menu>
    </div>
</template>
<script setup lang="ts">
import AUTH from '@/constants/AUTH';
</script>
<style lang="scss" scoped>
.loginView {
    background-color: green;
    padding: 1rem;
    menu {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }
}
</style>
