import TRANSLATOR from '@/constants/TRANSLATOR';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { requestTranslatedText } from '@/api/translate';
import createDebounce from '@/utils/createDebounce';

export const useTranslatorStore = defineStore('translator', () => {
    const originalText = ref<string>('');
    const translatedText = ref<string>('');
    const debouncedFetchTranslatedText = createDebounce(
        fetchTranslatedText,
        TRANSLATOR.LATENCY
    );

    watch(originalText, (newText) => {
        debouncedFetchTranslatedText(newText);
    });

    function setOriginalText(text: string) {
        originalText.value = text;
    }
    async function fetchTranslatedText(originText: string) {
        const response = await requestTranslatedText(originText);

        if (!response.isSuccess) {
            translatedText.value = '';
            return;
        }
        translatedText.value = response.data;
    }

    return {
        originalText,
        translatedText,
        setOriginalText,
    };
});
