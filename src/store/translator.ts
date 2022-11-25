import { LanguageType } from '@/types/LanguageType';
import TRANSLATOR from '@/constants/TRANSLATOR';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { requestTranslatedText } from '@/api/translate';
import createDebounce from '@/utils/createDebounce';

export const useTranslatorStore = defineStore('translator', () => {
    const source = ref<LanguageType>('en');
    const target = ref<LanguageType>('ko');
    const originalText = ref<string>('');
    const translatedText = ref<string>('');
    const allTranslations = ref<object | null>(null);
    const debouncedFetchTranslatedText = createDebounce(
        fetchTranslatedText,
        TRANSLATOR.LATENCY
    );

    watch(originalText, (newText) => {
        debouncedFetchTranslatedText(newText);
    });
    watch(source, () => {
        fetchTranslatedText(originalText.value);
    });
    watch(target, () => {
        fetchTranslatedText(originalText.value);
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
            text: originText.trim(),
            source: source.value,
            target: target.value,
        };
        const response = await requestTranslatedText(option);

        if (!response.isSuccess) {
            translatedText.value = '';
            return;
        }
        translatedText.value = response.payload.text.translated;
        allTranslations.value = response.payload.allTranslations || {};
    }

    return {
        source,
        target,
        originalText,
        translatedText,
        allTranslations,
        setOriginalText,
        setSourceLanguage,
        setTargetLanguage,
    };
});
