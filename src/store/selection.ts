import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedText from '@/utils/getSerializedText';

export const useSelectionStore = defineStore('selection', () => {
    const selection = ref<Selection>();
    const selectedText = ref<string>('');

    function setSelection(newSelection: Selection) {
        selection.value = newSelection;
        selectedText.value = getSerializedText(newSelection.toString());
    }

    function getSelectedText() {
        if (selection.value) {
            return getSerializedText(selection.value.toString());
        }
        return '';
    }
    return {
        selection,
        selectedText,
        setSelection,
        getSelectedText,
    };
});
