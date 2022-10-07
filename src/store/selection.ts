import { defineStore } from 'pinia';
import { ref } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const selecting = ref<boolean>(false);
    const selectEnd = ref<boolean>(false);

    function setSelecting() {
        selecting.value = true;
        selectEnd.value = false;
    }

    function setSelectEnd() {
        selecting.value = false;
        selectEnd.value = true;
    }

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
        setSelecting,
        setSelectEnd,
        range,
    };
});
