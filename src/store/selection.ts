import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSelectionStore = defineStore('selection', () => {
    const isPopupShow = ref<boolean>(false);
    const selection = ref<Selection | null>(null);
    const selectedText = computed(
        () =>
            selection.value
                ?.toString()
                .replace(/-[\n\r]+/g, '')
                .replace(/[\n\r]+/g, ' ') || ''
    );

    function setSelection(newSelection: Selection | null) {
        selection.value = newSelection;

        if (!selection.value || selection.value.isCollapsed) {
            isPopupShow.value = false;
            return;
        }
        isPopupShow.value = true;
    }

    function getSelectionText() {
        return window.getSelection();
    }

    return {
        selection,
        selectedText,
        isPopupShow,
        setSelection,
        getSelectionText,
    };
});
