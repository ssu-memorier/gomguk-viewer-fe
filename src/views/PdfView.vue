<template>
    <div class="pdfView" v-if="isPdfExist" @copy="copyHandler">
        <PdfPage
            v-for="PageIndex in pageIndexList"
            :key="PageIndex.key"
            :pageIndex="PageIndex.idx"
        >
        </PdfPage>
    </div>
    <div class="noPdf" v-else>
        <p>파일을 불러와주세요</p>
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { PdfState } from '@/Interface/PdfState';
import { usePdfStore } from '@/store/pdf';
import { ref } from 'vue';
import getCopiedText from '@/utils/getCopiedText';
type PageIndex = {
    idx: number;
    key: string;
};

const pdfStore = usePdfStore();
const pageIndexList = ref<PageIndex[]>([]);
const isPdfExist = ref<boolean>(false);

pdfStore.$subscribe('doc', (state: PdfState) => {
    if (!state.doc) {
        isPdfExist.value = false;

        return;
    }

    isPdfExist.value = true;
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

function copyHandler(evt: ClipboardEvent) {
    const copiedText = getCopiedText();
    const clipboard = evt.clipboardData;

    if (!clipboard) return;

    clipboard.setData('text/plain', copiedText);
    evt.preventDefault();
}
</script>

<style lang="scss" scoped>
.pdfView {
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 10rem;
    display: flex;
    flex-direction: column;
}
.noPdf {
    position: relative;
    height: 500px;
    p {
        position: absolute;
        width: 200px;
        top: 50%;
        margin-top: -100px;
        left: 50%;
        margin-left: -100px;
    }
}
</style>
