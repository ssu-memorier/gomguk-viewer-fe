<template>
    <pdf-load-button @load="loadPdfHandler" ref="$loadButton"></pdf-load-button>
</template>
<script lang="ts">
export default {
    name: 'FileUpload',
};
</script>
<script setup lang="ts">
import PdfLoadButton from '@/components/button/PdfLoadButton.vue';
import { requestFileUpload } from '@/api/storage';
import { usePdfStore } from '@/store/pdf';
import { ref } from 'vue';

const $loadButton = ref();
const pdfStore = usePdfStore();
async function loadPdfHandler(pdf: File) {
    const response = await requestFileUpload({
        dir: 'test_id',
        key: pdf.name,
        file: pdf,
    });

    if (!response.isSuccess) return;

    const fileLoadEvent = new Event('loadfile', { bubbles: true });

    $loadButton.value.$el.dispatchEvent(fileLoadEvent);
    pdfStore.setPdfFile(pdf);
}
</script>
