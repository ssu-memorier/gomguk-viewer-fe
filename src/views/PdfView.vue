<template>
    <div class="pdf-view">
        <PdfPage :pageNum="1"></PdfPage>
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { usePdfStore } from '@/store/pdf';
import { onBeforeMount } from 'vue';

/**
 * tempPdfUrl은 파일을 불러오는 기능을 추가하기 전 임시로 PDF를 불러오기 위해 사용합니다.
 * 다음 브랜치에서 삭제할 예정입니다.
 */
const tempPdfUrl = '/compressed.tracemonkey-pldi-09.pdf';
const pdfStore = usePdfStore();

onBeforeMount(async () => {
    await pdfStore.setPdfFromUrl(tempPdfUrl);
});
</script>
