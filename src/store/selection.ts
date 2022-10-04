import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedText from '@/utils/getSerializedText';

export const useSelectionStore = defineStore('selection', () => {
    const selection = ref<Selection | null>(null);
    const selectedText = ref<string>('');

    function setSelection(newSelection: Selection) {
        selection.value = newSelection;
        selectedText.value = getSerializedText(newSelection.toString());
    }

    return {
        selection,
        selectedText,
        setSelection,
    };
});
