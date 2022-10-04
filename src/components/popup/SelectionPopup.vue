<template>
    <ul :class="{ show: props.isShow }" class="card">
        <li
            v-for="MENU in SELECTION.MENUS"
            :key="MENU.TYPE"
            class="menu"
            :data-event-type="MENU.TYPE"
            @click.capture="menuHandler"
        >
            {{ MENU.NAME }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTranslatorStore } from '@/store/translator';
import { useSelectionStore } from '@/store/selection';
import SELECTION from '@/constants/SELECTION';
import writeToClipboard from '@/utils/writeToClipboard';

const props = defineProps({
    isShow: {
        type: Boolean,
        required: true,
    },
});
const translatorStore = useTranslatorStore();
const selectionStore = useSelectionStore();

function menuHandler(evt: Event) {
    const $target = evt.target as HTMLElement;
    const eventType = $target.dataset[SELECTION.DATASET.EVENT_TYPE];

    switch (eventType) {
        case SELECTION.MENUS.TRANSLATE.TYPE: {
            const originText = selectionStore.selectedText;

            translatorStore.setOriginalText(originText);
            break;
        }
        case SELECTION.MENUS.COPY.TYPE: {
            const originText = selectionStore.selectedText;

            writeToClipboard(originText);
            break;
        }
    }
}
</script>

<style lang="scss">
ul.selectionPopup {
    display: inline-flex;
    flex-direction: row;
    opacity: 0;
    z-index: 200;
    background-color: #fff;
    padding: 0;
    li.menu {
        list-style: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
}
ul.selectionPopup.show {
    opacity: 1;
}
</style>
