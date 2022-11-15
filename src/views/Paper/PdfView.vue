<template>
    <div id="pdfView" ref="$pdfView" class="view">
        <div class="noPdf" v-if="pageNumList.length <= 0">
            <p>파일을 불러와주세요😀</p>
        </div>
        <div class="header" v-else>
            <button @click="zoomOutHandler">-</button>
            <span>{{ scalePercent }}%</span>
            <button @click="zoomInHandler">+</button>
            <label>
                eraser
                <input
                    type="checkbox"
                    @change="changeTool($event, TOOL.ERASER)"
                />
            </label>
        </div>
        <div class="pageView" ref="$pageView">
            <div
                class="pageContainer"
                ref="$pageContainer"
                @copy="copyHandler"
                :class="{ eraseMode: toolsStore.tool === TOOL.ERASER }"
            >
                <PdfPage
                    v-for="num in pageNumList"
                    :key="pdfStore.fileName + num"
                    :page-index="num"
                    viewport-id="pdfView"
                >
                </PdfPage>
                <SelectionPopup
                    class="selectionPopup"
                    :class="{ show: isPopupShow }"
                    ref="$selectionPopup"
                ></SelectionPopup>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PdfPage from '@/components/PdfPage.vue';
import { useSelectionStore } from '@/store/selection';
import { usePdfStore } from '@/store/file/pdf';
import { useToolsStore } from '@/store/file/tools';
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
import TOOL from '@/constants/TOOL';
import { ToolType } from '@/types/ToolType';

const pdfStore = usePdfStore();
const toolsStore = useToolsStore();
const selectionStore = useSelectionStore();
const $selectionPopup = ref();
const $pdfView = ref();
const $pageView = ref();
const $pageContainer = ref();
const isPopupShow = ref<boolean>(false);
const pageNumList = ref<number[]>([]);
const scalePercent = computed(() => {
    return Math.floor(pdfStore.viewportOption.scale * 100);
});

onMounted(() => {
    $pdfView.value.addEventListener('mousedown', () => {
        if (toolsStore.tool === TOOL.NONE) selectionStartHandler();
    });
    document.addEventListener('selectionchange', () => {
        if (toolsStore.tool === TOOL.NONE) selectionChangeHandler();
    });
    $pdfView.value.addEventListener('mouseup', (evt: MouseEvent) => {
        if (toolsStore.tool === TOOL.NONE) selectionEndHandler(evt);
    });
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
    const { scrollLeft, scrollTop } = $pageView.value;

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

    const scrollLeft = -pageContainerRect.x;
    const scrollTop = -pageContainerRect.y;
    const pageWidth = pageContainerRect.width;
    const pageHeight = pageContainerRect.height;
    const popupWidth = popupRect.width;
    const popupHeight = popupRect.height;

    return {
        x: scrollLeft + pageWidth - popupWidth,
        y: scrollTop + pageHeight - popupHeight,
    };
}
function zoomInHandler() {
    pdfStore.increaseScale();
}
function zoomOutHandler() {
    pdfStore.decreaseScale();
}

function changeTool(evt: Event, tool: ToolType) {
    const $target = evt.target as HTMLInputElement;

    if ($target.checked) {
        toolsStore.changeTool(tool);
        return;
    }

    toolsStore.changeTool(TOOL.NONE);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/PDF_VIEW';

#pdfView {
    height: inherit;
    overflow: hidden;

    padding: 0 16px 16px 0;
    .selectionPopup {
        position: absolute;
        opacity: 0;
        z-index: -1;
        &.show {
            opacity: 1;
            z-index: 200;
        }
    }
    .noPdf {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
            font-size: $NO_PDF_FONTSIZE;
        }
    }
    .header {
        height: $HEADER_HEIGHT;
        position: sticky;
        top: 0;
        background-color: $SURFACE-COLOR;
    }
    .pageView {
        height: $PAGE_CONTAINER_HEIGHT;
        overflow: scroll;
        .pageContainer {
            position: relative;
            margin: 0 auto;
            padding: $PAGE_CONTAINER_PADDING;
        }
    }
}
.eraseMode {
    user-select: none;
}
</style>
