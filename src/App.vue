<template>
    <header>
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
header {
    text-align: left;
    padding: 2rem;
    padding-top: 0;
    padding-bottom: 0;
    .appName {
        font-weight: bold;
        font-size: 1.6rem;
    }
    #fileLoad {
    }
}
</style>
