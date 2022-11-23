<template>
    <pdf-load-button @load="loadPdfHandler" ref="$loadButton"></pdf-load-button>
</template>
<script lang="ts">
export default {
    name: 'LocalFileLoad',
};
</script>
<script setup lang="ts">
import PdfLoadButton from '@/components/button/PdfLoadButton.vue';
import { usePdfStore } from '@/store/file/pdf';
import { useEditorStore } from '@/store/file/editor';
import { ref } from 'vue';
import EDITOR from '@/constants/EDITOR';

const $loadButton = ref();
const pdfStore = usePdfStore();
const editorStore = useEditorStore();

async function loadPdfHandler(pdf: File) {
    pdfStore.setPdfFile(pdf);
    editorStore.fromJSON({
        time: 1668084171608,
        blocks: [EDITOR.DEFAULT],
        version: '2.25.0',
    });

    return;
}
</script>
