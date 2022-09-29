<template>
    <header class="card">
        <b class="appName">곰국 뷰어</b>
        <pdf-load-button @load="loadPdfHandler"></pdf-load-button>
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
    text-align: left;
    padding: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 100;
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
