import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import linkSentences from '@/utils/linkSentences';
import getSelectedPageIndex from '@/utils/getSelectedPageIndex';
import hasText from '@/utils/hasText';
import Line from '@/classes/Line';
import getSelectedLines from '@/utils/getSelectedLines';

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

        const selectedSentences = selectedLines.value.map((line) =>
            line.getText()
        );
        const selectedText = linkSentences(selectedSentences);
        return selectedText;
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
