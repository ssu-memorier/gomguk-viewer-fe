import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';
import getSelectedPageIndex from '@/utils/getSelectedPageIndex';
import hasText from '@/utils/hasText';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const isSelectionExist = computed(() => {
        return !!range.value && !range.value.collapsed;
    });
    const selectedPageIndex = computed(() => {
        return isSelectionExist.value
            ? getSelectedPageIndex(range.value as Range)
            : null;
    });
    const hasSelectedText = computed(() => {
        if (range.value) return hasText(range.value);

        return false;
    });
    function setSelection(newSelection: Selection | null) {
        range.value = newSelection?.getRangeAt(0);
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
        hasSelectedText,
        selectedPageIndex,
        isSelectionExist,
        range,
    };
});
