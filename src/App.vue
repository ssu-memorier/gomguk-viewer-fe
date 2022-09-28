<template>
    <header>머리</header>
    <main>
        <section>
            <pdf-view></pdf-view>
        </section>
        <section></section>
    </main>
</template>

<script setup lang="ts">
import PdfView from '@/views/PdfView.vue';
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
