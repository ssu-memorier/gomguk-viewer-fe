import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import getSerializedTextFromNodes from '@/utils/getSerializedTextFromNodes';
import getSelectedPageIndex from '@/utils/getSelectedPageIndex';
import hasText from '@/utils/hasText';
import getLeftGap from '@/utils/line/getLeftGap';
import getRightGap from '@/utils/line/getRightGap';
import getLineNum from '@/utils/line/getLineNum';
import getLineMap from '@/utils/line/getLineMap';
import getSelectedTokens from '@/utils/getSelectedTokens';
import Line from '@/classes/Line';

export const useSelectionStore = defineStore('selection', () => {
    const range = ref<Range | null>();
    const isSelectionExist = computed<boolean>(() => {
        return !!range.value && !range.value.collapsed;
    });
    const selectedPageIndex = computed<number>(() => {
        return isSelectionExist.value
            ? getSelectedPageIndex(range.value as Range)
            : -1;
    });
    const hasSelectedText = computed<boolean>(() => {
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

    const selectedLines = computed<Line[]>(() => {
        const rng = range.value as Range;
        if (!rng || rng.collapsed) return [];

        const { startContainer, startOffset, endContainer, endOffset } = rng;
        const selectedTokens = getSelectedTokens(rng);
        const lineMap = getLineMap(selectedTokens);

        setStartLineGap();
        setLastLineGap();

        const result = [...lineMap.values()];

        return result;

        function setStartLineGap() {
            const $startToken = startContainer.parentElement;

            if (!$startToken) return;

            const startLineNum = getLineNum($startToken);
            const startLine = lineMap.get(startLineNum);

            if (!startLine) return;

            const leftGap = getLeftGap(startContainer, startOffset);

            startLine.setLeft(leftGap + startLine.left);
        }

        function setLastLineGap() {
            const $endToken = endContainer.parentElement;

            if (!$endToken) return;

            const endLineNum = getLineNum($endToken);
            const endLine = lineMap.get(endLineNum);

            if (!endLine) return;

            const rightGap = getRightGap(endContainer, endOffset);

            endLine.setRight(endLine.right - rightGap);
        }
    });
    return {
        setSelection,
        getSelectedText,
        hasSelectedText,
        selectedPageIndex,
        isSelectionExist,
        selectedLines,
        range,
    };
});
