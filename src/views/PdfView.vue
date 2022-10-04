<template>
    <div class="pdfView" ref="$pdfView">
        <div
            class="pageContainer"
            ref="$pageContainer"
            v-if="isPdfExist"
            @copy="copyHandler"
        >
            <PdfPage
                v-for="PageIndex in pageIndexList"
                :key="PageIndex.key"
                :pageIndex="PageIndex.idx"
            >
            </PdfPage>
            <SelectionPopup
                class="selectionPopup"
                :class="{ show: isPopupShow }"
                ref="$selectionPopup"
            ></SelectionPopup>
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
import { useSelectionStore } from '@/store/selection';
import { ref, onMounted } from 'vue';
import CLIPBOARD from '@/constants/CLIPBOARD';
import SelectionPopup from '@/components/popup/SelectionPopup.vue';

type PageIndex = {
    idx: number;
    key: string;
};

const pdfStore = usePdfStore();
const selectionStore = useSelectionStore();
const pageIndexList = ref<PageIndex[]>([]);
const isPdfExist = ref<boolean>(false);
const $selectionPopup = ref();
const $pdfView = ref();
const $pageContainer = ref();
const isPopupShow = ref<boolean>(false);

onMounted(() => {
    $pdfView.value.addEventListener('mouseup', (evt: MouseEvent) => {
        const selection = window.getSelection();
        const { clientX, clientY } = evt;
        /**
         * selection end시 팝업을 띄우고 selection 데이터를 selectionStore에 저장
         */
        if (selection && !selection.isCollapsed) {
            setPopupPosition(clientX, clientY);
            selectionStore.setRange(selection.getRangeAt(0));
            isPopupShow.value = true;
        } else {
            isPopupShow.value = false;
        }
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
    const clipboard = evt.clipboardData;

    if (!clipboard) return;

    clipboard.setData(CLIPBOARD.CONTENT_TYPE, selectionStore.getSelectedText());
    evt.preventDefault();
}

function setPopupPosition(x: number, y: number): void {
    const scrollTop = $pdfView.value.scrollTop;
    const scrollLeft = $pdfView.value.scrollLeft;
    const pageContainerRect = $pageContainer.value.getBoundingClientRect();
    const baseX = pageContainerRect.x;
    const baseY = pageContainerRect.y;

    $selectionPopup.value.$el.style.left = `${x + scrollLeft - baseX}px`;
    $selectionPopup.value.$el.style.top = `${y + scrollTop - baseY}px`;
}
</script>

<style lang="scss" scoped>
.pdfView {
    width: inherit;
    height: inherit;
    overflow: scroll;
    padding-top: 1rem;
    padding-bottom: 10rem;
    .selectionPopup {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: -1;
        &.show {
            opacity: 1;
            z-index: 200;
        }
    }

    .pageContainer {
        margin: 0 auto;
        position: relative;
        width: 100%;
        height: fit-content;
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
}
</style>
