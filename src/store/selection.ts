import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import getSerializedText from '@/utils/getSerializedText';

export const useSelectionStore = defineStore('selection', () => {
    const selection = ref<Selection>();
    const selectedText = ref<string>('');

    watch(selection, (newSelection) => {
        if (newSelection) {
            selectedText.value = getSerializedText(newSelection.toString());
        }
    });

    function setSelection(newSelection: Selection) {
        selection.value = newSelection;
    }

    return {
        selection,
        selectedText,
        setSelection,
    };
});
