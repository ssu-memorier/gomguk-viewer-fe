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
import { ref } from 'vue';

const $loadButton = ref();
const fileStore = useFileStore();

async function loadPdfHandler(pdf: File) {
    await fileStore.uploadFile(pdf);
}
</script>
