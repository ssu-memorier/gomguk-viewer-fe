import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const isSelectionExist = ref<boolean>();
    const selectedPageIndex = ref<number | null>(null);

    function setSelection(newSelection: Selection | null) {
        range.value = newSelection?.getRangeAt(0);

        if (range.value && !range.value.collapsed) {
            isSelectionExist.value = true;
            selectedPageIndex.value = getSelectionPageIndex(range.value);
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

    function getSelectionPageIndex(range: Range) {
        if (!range.commonAncestorContainer) return null;

        let ancestorContainer = range.commonAncestorContainer as HTMLElement;
        if (ancestorContainer.nodeName === '#text') {
            const textContainer =
                ancestorContainer.parentElement as HTMLElement;
            ancestorContainer = textContainer.parentElement as HTMLElement;
        }

        const pageIndexData = ancestorContainer.dataset['pageIndex'];

        if (!pageIndexData) return null;

        return parseInt(pageIndexData, 10);
    }
    return {
        setSelection,
        getSelectedText,
        selectedPageIndex,
        isSelectionExist,
        range,
    };
});
