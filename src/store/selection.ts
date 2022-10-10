import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();

    function setRange(newRange: Range | null) {
        range.value = newRange;
    }

    function getSelectedText() {
        if (range.value) {
            const nodes = Array(...range.value.cloneContents().childNodes);

            return getSerializedTextFromNodes(nodes);
        }
        return '';
    }

    return {
        setRange,
        getSelectedText,
        range,
    };
});
