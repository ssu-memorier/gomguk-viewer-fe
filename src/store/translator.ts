import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestTranslateOriginText } from '@/api/translate';
export const useTranslatorStore = defineStore('translator', () => {
    const isMinimized = ref<boolean>(false);
    const translatedText = ref<string>('');

    function setMinimize(isMinimize: boolean) {
        isMinimized.value = isMinimize;
    }
    async function setTranslatedText(originText: string) {
        translatedText.value = await requestTranslateOriginText(originText);
    }
    return {
        isMinimized,
        translatedText,
        setMinimize,
        setTranslatedText,
    };
});
