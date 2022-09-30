<template>
    <header class="card">
        <div class="center">
            <b class="appName">곰국 뷰어</b>
            <pdf-load-button @load="loadPdfHandler"></pdf-load-button>
        </div>
    </header>
    <main>
        <section>
            <pdf-view></pdf-view>
        </section>
        <section></section>
    </main>
</template>

<script setup lang="ts">
import PdfView from '@/views/PdfView.vue';
import { usePdfStore } from '@/store/pdf';
import PdfLoadButton from '@/components/button/PdfLoadButton.vue';

const store = usePdfStore();

function loadPdfHandler(pdf: File) {
    store.setPdfFromFile(pdf);
}
</script>

<style lang="scss">
@import url('@/assets/theme.css');
:root {
    --screen-main-max-width: 900px;
}
html,
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    background-color: var(--bg-color);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
}
header {
    background-color: var(--surface-color);
    padding: 0.5rem 2rem;
    z-index: 100;
    .center {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 auto;
        width: 100%;
        max-width: var(--screen-main-max-width);
    }
    .appName {
        font-weight: bold;
        font-size: 1.6rem;
    }
}
main {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
