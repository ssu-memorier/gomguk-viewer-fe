import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedText from '@/utils/getSerializedText';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range>();

    function setRange(newRange: Range) {
        range.value = newRange;
    }

    function getSelectedText() {
        if (range.value) {
            return getSerializedText(range.value.toString());
        }
        return '';
    }

    return {
        setRange,
        getSelectedText,
    };
});
