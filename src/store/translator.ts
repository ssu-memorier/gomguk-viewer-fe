import { LanguageType } from '@/types/LanguageType';
import TRANSLATOR from '@/constants/TRANSLATOR';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { requestTranslatedText } from '@/api/translate';
import createDebounce from '@/utils/createDebounce';

export const useTranslatorStore = defineStore('translator', () => {
    const source = ref<LanguageType>('ko');
    const target = ref<LanguageType>('en');
    const originalText = ref<string>('');
    const translatedText = ref<string>('');
    const debouncedFetchTranslatedText = createDebounce(
        fetchTranslatedText,
        TRANSLATOR.LATENCY
    );

    watch(originalText, (newText) => {
        debouncedFetchTranslatedText(newText);
    });
    function setSourceLanguage(code: LanguageType) {
        source.value = code;
    }
    function setTargetLanguage(code: LanguageType) {
        target.value = code;
    }
    function setOriginalText(text: string) {
        originalText.value = text;
    }
    async function fetchTranslatedText(originText: string) {
        const option = {
            text: originText,
            source: source.value,
            target: target.value,
        };
        const response = await requestTranslatedText(option);

        if (!response.isSuccess) {
            translatedText.value = '';
            return;
        }
        translatedText.value = response.data;
    }

    return {
        source,
        target,
        originalText,
        translatedText,
        setOriginalText,
        setSourceLanguage,
        setTargetLanguage,
    };
});
