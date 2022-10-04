<template>
    <div ref="$pdfView">
        <SelectionPopup
            class="selectionPopup"
            ref="$selectionPopup"
            :isShow="isPopupShow"
        ></SelectionPopup>
        <div class="pageContainer" v-if="isPdfExist" @copy="copyHandler">
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
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { PdfState } from '@/Interface/PdfState';
import { usePdfStore } from '@/store/pdf';
import { ref, onMounted } from 'vue';
import getCopiedText from '@/utils/getSelectionText';
import CLIPBOARD from '@/constants/CLIPBOARD';
import SELECTION from '@/constants/SELECTION';
import SelectionPopup from '@/components/popup/SelectionPopup.vue';

type PageIndex = {
    idx: number;
    key: string;
};

const pdfStore = usePdfStore();
const pageIndexList = ref<PageIndex[]>([]);
const isPdfExist = ref<boolean>(false);
const $selectionPopup = ref();
const $pdfView = ref();
const isPopupShow = ref<boolean>(false);

onMounted(() => {
    $pdfView.value.addEventListener(
        SELECTION.SELECTION_END_EVENT,
        selectionEndHandler
    );
    $pdfView.value.addEventListener('mousedown', () => {
        isPopupShow.value = false;
    });
});

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

    clipboard.setData(CLIPBOARD.CONTENT_TYPE, copiedText);
    evt.preventDefault();
}

function selectionEndHandler(evt: CustomEvent) {
    isPopupShow.value = true;
    const { clientX, clientY } = evt.detail;
    const { left, top } = $pdfView.value.getBoundingClientRect();

    const x = Math.max(clientX - left);
    const y = Math.max(clientY - top);
    $selectionPopup.value.$el.style.left = `${x}px`;
    $selectionPopup.value.$el.style.top = `${y}px`;
}
</script>

<style lang="scss" scoped>
.selectionPopup {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 200;
}
.pageContainer {
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 10rem;
    display: flex;
    flex-direction: column;
    z-index: 1;
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
        user-select: none;
    }
}
</style>
