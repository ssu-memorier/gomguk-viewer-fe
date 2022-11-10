import { defineStore } from 'pinia';
import { ref } from 'vue';
import Highlight from '@/classes/Highlight';

export const useHighlightStore = defineStore('highlight', () => {
    const highlightList = ref<Highlight[]>([]);

    function addHighlight(highlight: Highlight) {
        highlightList.value.push(highlight);
    }

    return {
        highlightList,
        addHighlight,
    };
});
