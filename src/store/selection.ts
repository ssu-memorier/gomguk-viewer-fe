import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const isSelectionExist = ref<boolean>();

    function setSelection(newSelection: Selection | null) {
        range.value = newSelection?.getRangeAt(0);

        if (range.value) {
            isSelectionExist.value = true;
        } else {
            isSelectionExist.value = false;
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
        isSelectionExist,
        range,
    };
});
