import TRANSLATOR from '@/constants/TRANSLATOR';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { requestTranslatedText } from '@/api/translate';
import createDebounce from '@/utils/createDebounce';

export const useTranslatorStore = defineStore('translator', () => {
    const isMinimized = ref<boolean>(false);
    const isError = ref<boolean>(false);
    const originalText = ref<string>('');
    const translatedText = ref<string>('');
    const debouncedFetchTranslatedText = createDebounce(
        fetchTranslatedText,
        TRANSLATOR.LATENCY
    );

    watch(originalText, (newText) => {
        debouncedFetchTranslatedText(newText);
    });

    function setMinimize(isMinimize: boolean) {
        isMinimized.value = isMinimize;
    }
    function setOriginalText(text: string) {
        originalText.value = text;
    }
    async function fetchTranslatedText(originText: string) {
        const response = await requestTranslatedText(originText);

        if ((isError.value = !response.isSuccess)) {
            translatedText.value = '';
            return;
        }
        translatedText.value = response.data;
    }

    return {
        isMinimized,
        originalText,
        translatedText,
        setOriginalText,
        setMinimize,
    };
});
