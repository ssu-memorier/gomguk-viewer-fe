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
import Line from '@/classes/Line';

const translatorStore = useTranslatorStore();
const selectionStore = useSelectionStore();
const highlightStore = useHighlightStore();

async function menuHandler(evt: Event) {
    const $target = evt.target as HTMLElement;
    const eventType = $target.dataset[POPUP.DATASET.EVENT_TYPE];
    switch (eventType) {
        case POPUP.MENUS.TRANSLATE.TYPE: {
            const originText = selectionStore.getSelectedText();

            translatorStore.setOriginalText(originText);
            break;
        }
        case POPUP.MENUS.COPY.TYPE: {
            const originText = selectionStore.getSelectedText();

            writeToClipboard(originText);
            break;
        }
        case POPUP.MENUS.HIGHLIGHT.TYPE: {
            const { selectedLines, selectedPageIndex } = selectionStore;
            const highlight = new Highlight(
                selectedPageIndex,
                selectedLines as Line[]
            );

            highlightStore.addHighlight(highlight);
            break;
        }
    }
}
</script>

<style lang="scss">
div.selectionPopup {
    background-color: #fff;
    width: 240px;
    ul {
        padding: 0;
        display: inline-flex;
        flex-direction: row;
        margin: 0;
    }
    li.menu {
        list-style: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
}
</style>
