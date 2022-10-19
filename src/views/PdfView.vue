<template>
    <div class="pdfView" ref="$pdfView">
        <div class="header" v-show="pageNumList.length > 0">
            <button @click="zoomOutHandler">-</button>
            <span>{{ scalePercent }}%</span>
            <button @click="zoomInHandler">+</button>
        </div>
        <div
            class="pageContainer"
            ref="$pageContainer"
            v-if="pageNumList.length > 0"
            @copy="copyHandler"
        >
            <PdfPage
                v-for="num in pageNumList"
                :key="pdfStore.fileName + num"
                :page-index="num"
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
import { useSelectionStore } from '@/store/selection';
import { usePdfStore } from '@/store/pdf';
import { ref, onMounted, computed } from 'vue';
import CLIPBOARD from '@/constants/CLIPBOARD';
import POPUP from '@/constants/POPUP';
import SelectionPopup from '@/components/popup/SelectionPopup.vue';
import SECLECTION from '@/constants/SELECTION';
import createUpperLimit from '@/utils/createUpperLimit';
import Line from '@/classes/Line';
import setSelection from '@/utils/setSelection';
import clearSelection from '@/utils/clearSelection';
import { IPos } from '@/Interface/IPos';

const pdfStore = usePdfStore();
const selectionStore = useSelectionStore();
const $selectionPopup = ref();
const $pdfView = ref();
const $pageContainer = ref();
const isPopupShow = ref<boolean>(false);
const pageNumList = ref<number[]>([]);
const scalePercent = computed(() => {
    return Math.floor(pdfStore.viewportOption.scale * 100);
});
onMounted(() => {
    $pdfView.value.addEventListener('mousedown', selectionStartHandler);
    document.addEventListener('selectionchange', selectionChangeHandler);
    document.addEventListener('mouseup', selectionEndHandler);
});

pdfStore.$subscribe((_, { numPages }) => {
    pageNumList.value = [];
    for (let i = 1; i <= numPages; i++) {
        pageNumList.value.push(i);
    }
});

function selectionStartHandler() {
    selectionStore.setRange(null);
    clearSelection();
    isPopupShow.value = false;
}
function selectionChangeHandler() {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
        selectionStore.setRange(selection.getRangeAt(0));
    }
}
function selectionEndHandler(evt: MouseEvent) {
    if (!selectionStore.range) {
        isPopupShow.value = false;
        return;
    }

    const { clientX, clientY } = evt;
    const { scrollLeft, scrollTop } = $pdfView.value;
    const mousePos: IPos = {
        x: clientX + scrollLeft,
        y: clientY + scrollTop,
    };
    setPopupPosition(mousePos);
    isPopupShow.value = true;

    setSelection(selectionStore.selectedLines as Line[]);
}

function copyHandler(evt: ClipboardEvent) {
    const clipboard = evt.clipboardData;

    if (!clipboard) return;

    clipboard.setData(CLIPBOARD.CONTENT_TYPE, selectionStore.getSelectedText());
    evt.preventDefault();
}

function setPopupPosition(pos: IPos): void {
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
            POPUP.VIEW.MARGIN.X,
        y:
            y -
            $pageContainer.value.offsetTop -
            SECLECTION.VIEW.BASE_Y +
            POPUP.VIEW.MARGIN.Y,
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
): IPos {
    const pageContainerRect = $pageContainer.getBoundingClientRect();
    const popupRect = $selectionPopup.getBoundingClientRect();

    return {
        x: pageContainerRect.width - popupRect.width,
        y: pageContainerRect.height - popupRect.height,
    };
}
function zoomInHandler() {
    pdfStore.increaseScale();
}
function zoomOutHandler() {
    pdfStore.decreaseScale();
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';

.pdfView {
    width: inherit;
    height: inherit;
    overflow: scroll;
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
    .header {
        top: 0;
        z-index: 10;
        position: sticky;
        background-color: $surface-color;
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
