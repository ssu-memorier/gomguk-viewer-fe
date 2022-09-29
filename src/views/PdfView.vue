<template>
    <div class="pdf-view">
        <PdfPage
            v-for="pageNum in pdfPageNumList"
            :key="pageNum"
            :pageNum="pageNum"
        >
        </PdfPage>
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { PdfState } from '@/Interface/PdfState';
import { usePdfStore } from '@/store/pdf';
import { onBeforeMount, ref } from 'vue';

/**
 * tempPdfUrl은 파일을 불러오는 기능을 추가하기 전 임시로 PDF를 불러오기 위해 사용합니다.
 * 다음 브랜치에서 삭제할 예정입니다.
 */
const tempPdfUrl = '/compressed.tracemonkey-pldi-09.pdf';
const pdfStore = usePdfStore();
const pdfPageNumList = ref<number[]>([]);
onBeforeMount(() => {
    pdfStore.setPdfFromUrl(tempPdfUrl);
});

pdfStore.$subscribe('doc', (state: PdfState) => {
    if (state.doc) {
        const maxPageNum = pdfStore.doc.numPages;
        for (let i = 1; i <= maxPageNum; i++) {
            pdfPageNumList.value.push(i);
        }
    }
});
</script>
