import { defineStore } from 'pinia';
import { ref } from 'vue';
import Highlight, { IHighlight } from '@/classes/Highlight';

export const useHighlightStore = defineStore('highlight', () => {
    const highlightList = ref<Highlight[]>([]);
    function getHiglightsInPage(page: number) {
        return highlightList.value.filter((h) => h.pageNum === page);
    }
    function deleteHighlight(highlight: Highlight) {
        const idx = highlightList.value.indexOf(highlight);

        if (idx < 0) return;
        highlightList.value.splice(idx, 1);
    }
    function addHighlight(highlight: Highlight) {
        highlightList.value.push(highlight);
    }
    function toJSON() {
        return highlightList.value.map((highlight) => highlight.toJSON());
    }
    function fromArray(arr: Array<IHighlight>) {
        highlightList.value = arr.map((json) => Highlight.fromJSON(json));
    }
    return {
        highlightList,
        getHiglightsInPage,
        deleteHighlight,
        addHighlight,
        toJSON,
        fromArray,
    };
});
