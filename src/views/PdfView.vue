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
import POPUP from '@/constants/POPUP';
import SelectionPopup from '@/components/popup/SelectionPopup.vue';
import SECLECTION from '@/constants/SELECTION';
import createUpperLimit from '@/utils/createUpperLimit';

type PageIndex = {
    idx: number;
    key: string;
};
type Pos = {
    x: number;
    y: number;
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
    $pdfView.value.addEventListener('mousedown', selectionStartHandler);
    document.addEventListener('selectionchange', selectionChangeHandler);
    $pdfView.value.addEventListener('mouseup', selectionEndHandler);
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
function selectionStartHandler() {
    selectionStore.setSelection(null);
    isPopupShow.value = false;
}
function selectionChangeHandler() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    selectionStore.setSelection(selection);
}
function selectionEndHandler(evt: MouseEvent) {
    if (selectionStore.isSelectionExist) {
        const { clientX, clientY } = evt;

        setPopupPosition({ x: clientX, y: clientY });
        isPopupShow.value = true;
        return;
    }

    isPopupShow.value = false;
    return;
}
function copyHandler(evt: ClipboardEvent) {
    const clipboard = evt.clipboardData;

    if (!clipboard) return;

    clipboard.setData(CLIPBOARD.CONTENT_TYPE, selectionStore.getSelectedText());
    evt.preventDefault();
}

function setPopupPosition(pos: Pos): void {
    const popupPosMax = getPopupPosMax(
        $pageContainer.value,
        $selectionPopup.value.$el
    );
    const { x, y } = pos;
    const mouseRelativePos = {
        x:
            x -
            $pageContainer.value.offsetLeft -
            SECLECTION.VIEW.BASE_X +
            POPUP.MARGIN.X,
        y:
            y -
            $pageContainer.value.offsetTop -
            SECLECTION.VIEW.BASE_Y +
            POPUP.MARGIN.Y,
    };

    const limitMouseLeft = createUpperLimit(popupPosMax.x);
    const limitMouseTop = createUpperLimit(popupPosMax.y);
    const limitedLeft = limitMouseLeft(mouseRelativePos.x);
    const limitedTop = limitMouseTop(mouseRelativePos.y);

    $selectionPopup.value.$el.style.left = `${limitedLeft}px`;
    $selectionPopup.value.$el.style.top = `${limitedTop}px`;
}

function getPopupPosMax(
    $pageContainer: HTMLElement,
    $selectionPopup: HTMLElement
): Pos {
    const pageContainerRect = $pageContainer.getBoundingClientRect();
    const popupRect = $selectionPopup.getBoundingClientRect();

    return {
        x: pageContainerRect.width - popupRect.width,
        y: pageContainerRect.height - popupRect.height,
    };
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
        width: fit-content;
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
