import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';
import getSelectedPageIndex from '@/utils/getSelectedPageIndex';
import hasText from '@/utils/hasText';
import Line from '@/classes/Line';
import getSelectedLines from '@/utils/getSelectedLines';
/**
 * TODO:
 * range가 변경되면 selectedLines을 만든다.
 * isSelectionExist: selectedLine이 있으면 true
 * selectedPageIndex: selection이 발생한 page의 index
 *
 */
export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const selectedLines = ref<Line[]>([]);
    const selectedPageIndex = ref<number>(-1);
    const isSelectionExist = ref<boolean>(false);

    function setRange(newRange: Range | null) {
        range.value = newRange;
    }

    function getSelectedText() {
        if (!isSelectionExist.value) return '';

        const selectedStr = selectedLines.value.reduce((acc, line) => {
            return acc + line.getText();
        }, '');

        return selectedStr;
        // return getSerializedTextFromNodes(nodes);
    }

    watch(range, (newRange) => {
        if (!newRange) {
            selectedLines.value = [];
            isSelectionExist.value = false;
            return;
        }

        if (!hasText(newRange)) return;

        selectedLines.value = getSelectedLines(newRange);
        selectedPageIndex.value = getSelectedPageIndex(newRange);
        isSelectionExist.value = selectedLines.value.length > 0;
    });
    return {
        setRange,
        getSelectedText,
        selectedPageIndex,
        isSelectionExist,
        selectedLines,
        range,
    };
});
