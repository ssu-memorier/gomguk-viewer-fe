import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';
import getSelectedPageIndex from '@/utils/getSelectedPageIndex';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const isSelectionExist = ref<boolean>();
    const selectedPageIndex = ref<number | null>(null);

    function setSelection(newSelection: Selection | null) {
        range.value = newSelection?.getRangeAt(0);

        if (range.value && !range.value.collapsed) {
            isSelectionExist.value = true;
            selectedPageIndex.value = getSelectedPageIndex(range.value);
        } else {
            isSelectionExist.value = false;
            selectedPageIndex.value = null;
        }
    }

    function getSelectedText() {
        if (range.value) {
            const nodes = Array(...range.value.cloneContents().childNodes);

            return getSerializedTextFromNodes(nodes);
        }
        return '';
    }

    return {
        setSelection,
        getSelectedText,
        selectedPageIndex,
        isSelectionExist,
        range,
    };
});
