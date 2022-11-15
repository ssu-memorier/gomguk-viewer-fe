<template>
    <div class="loginView view">
        <menu>
            <button>카카오</button>
            <button>구글</button>
        </menu>
    </div>
</template>
<script setup lang="ts"></script>
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
