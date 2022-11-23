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
import { useModalStore } from '@/store/modal';
import { useEditorStore } from '@/store/file/editor';
import { ref } from 'vue';
import EDITOR from '@/constants/EDITOR';

const $loadButton = ref();
const pdfStore = usePdfStore();
const editorStore = useEditorStore();
const modalStore = useModalStore();

async function loadPdfHandler(pdf: File) {
    pdfStore.setPdfFile(pdf);
    editorStore.fromJSON(EDITOR.DEFAULT);
    modalStore.hideModal();

    return;
}
</script>
