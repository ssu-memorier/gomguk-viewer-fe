<template>
    <div class="pdfView">
        <PdfPage
            v-for="PageIndex in pageIndexList"
            :key="PageIndex.key"
            :pageIndex="PageIndex.idx"
        >
        </PdfPage>
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { PdfState } from '@/Interface/PdfState';
import { usePdfStore } from '@/store/pdf';
import { onBeforeMount, ref } from 'vue';
type PageIndex = {
    idx: number;
    key: string;
};
/**
 * tempPdfUrl은 파일을 불러오는 기능을 추가하기 전 임시로 PDF를 불러오기 위해 사용합니다.
 * 다음 브랜치에서 삭제할 예정입니다.
 */
const tempPdfUrl = '/compressed.tracemonkey-pldi-09.pdf';
const pdfStore = usePdfStore();
const pageIndexList = ref<PageIndex[]>([]);
onBeforeMount(() => {
    pdfStore.setPdfFromUrl(tempPdfUrl);
});

pdfStore.$subscribe('doc', (state: PdfState) => {
    if (!state.doc) return;

    pageIndexList.value = createPageIndexList(
        state.fileName,
        state.doc.numPages
    );
});

function createPageIndexList(fileName: string, maxPageNum: number) {
    const list = [];
    for (let i = 1; i <= maxPageNum; i++) {
        list.push({
            idx: i,
            key: `${fileName}-${i}`,
        });
    }
    return list;
}
</script>

<style lang="scss" scoped>
.pdfView {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
