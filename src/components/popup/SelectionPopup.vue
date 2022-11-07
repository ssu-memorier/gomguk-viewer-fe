<template>
    <div class="selectionPopup">
        <ul class="card" v-if="selectionStore.isSelectionExist">
            <li
                v-for="MENU in POPUP.MENUS"
                :key="MENU.TYPE"
                class="menu"
                :data-event-type="MENU.TYPE"
                @mousedown="menuHandler"
            >
                {{ MENU.NAME }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useTranslatorStore } from '@/store/translator';
import { useSelectionStore } from '@/store/selection';
import { useHighlightStore } from '@/store/highlight';

import POPUP from '@/constants/POPUP';
import writeToClipboard from '@/utils/writeToClipboard';
import Highlight from '@/classes/Highlight';

const translatorStore = useTranslatorStore();
const selectionStore = useSelectionStore();
const highlightStore = useHighlightStore();

function menuHandler(evt: Event) {
    const $target = evt.target as HTMLElement;
    const eventType = $target.dataset[POPUP.DATASET.EVENT_TYPE];
    switch (eventType) {
        case POPUP.MENUS.TRANSLATE.TYPE: {
            translateHandler();
            break;
        }
        case POPUP.MENUS.COPY.TYPE: {
            copyHandler();
            break;
        }
        case POPUP.MENUS.HIGHLIGHT.TYPE: {
            highlightHandler();
            break;
        }
    }
}

function translateHandler() {
    const originText = selectionStore.getSelectedText();

    translatorStore.setOriginalText(originText);
}
function copyHandler() {
    const originText = selectionStore.getSelectedText();

    writeToClipboard(originText);
}
function highlightHandler() {
    const { range, selectedPageIndex } = selectionStore;
    if (!range) return;

    const highlight = new Highlight(selectedPageIndex, range);
    highlightStore.addHighlight(highlight);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/constants/POPUP';
div.selectionPopup {
    background-color: #fff;
    width: $POPUP-WIDTH;
    ul {
        width: 100%;
        padding: 0;
        display: inline-flex;
        flex-direction: row;
        margin: 0;
    }
    li.menu {
        list-style: none;
        padding: $POPUP-ITEM-PADDING;
        cursor: pointer;
        flex-grow: 1;
    }
}
</style>
