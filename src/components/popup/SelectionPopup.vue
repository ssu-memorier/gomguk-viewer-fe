<template>
    <div class="selectionPopup">
        <ul class="card" v-if="selectionStore.isSelectionExist">
            <li
                v-for="MENU in SELECTION.MENUS"
                :key="MENU.TYPE"
                class="menu"
                :data-event-type="MENU.TYPE"
                @mousedown.stop="menuHandler"
                @mouseup.stop
            >
                {{ MENU.NAME }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useTranslatorStore } from '@/store/translator';
import { useSelectionStore } from '@/store/selection';
import SELECTION from '@/constants/SELECTION';
import writeToClipboard from '@/utils/writeToClipboard';

const translatorStore = useTranslatorStore();
const selectionStore = useSelectionStore();

function menuHandler(evt: Event) {
    const $target = evt.target as HTMLElement;
    const eventType = $target.dataset[SELECTION.DATASET.EVENT_TYPE];
    switch (eventType) {
        case SELECTION.MENUS.TRANSLATE.TYPE: {
            const originText = selectionStore.getSelectedText();

            translatorStore.setOriginalText(originText);
            break;
        }
        case SELECTION.MENUS.COPY.TYPE: {
            const originText = selectionStore.getSelectedText();

            writeToClipboard(originText);
            break;
        }
    }
}
</script>

<style lang="scss">
div.selectionPopup {
    background-color: #fff;
    width: 160px;
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
