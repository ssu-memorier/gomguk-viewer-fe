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
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
}
header {
    text-align: left;
    padding: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .appName {
        font-weight: bold;
        font-size: 1.6rem;
    }
}
main {
    padding-top: 2rem;
}
</style>
