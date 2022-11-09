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
import { useFileStore } from '@/store/file';
import { usePdfStore } from '@/store/file/pdf';
import { ref } from 'vue';
import MESSAGE from '@/constants/MESSAGE';

const $loadButton = ref();
const fileStore = useFileStore();
const pdfStore = usePdfStore();

async function loadPdfHandler(pdf: File) {
    const isSuccess = await fileStore.uploadFile(pdf);

    if (!isSuccess) {
        alert(MESSAGE.STORAGE.UPLOAD_FAILED);
        return;
    }

    setPdf(pdf);
    notifyFileLoad();
}

function setPdf(pdf: File) {
    pdfStore.setPdfFile(pdf);
}

function notifyFileLoad() {
    const fileLoadEvent = new Event('loadfile', { bubbles: true });
    $loadButton.value.$el.dispatchEvent(fileLoadEvent);
}
</script>
