import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestTranslatedText } from '@/api/translate';
export const useTranslatorStore = defineStore('translator', () => {
    const isMinimized = ref<boolean>(false);
    const translatedText = ref<string>('');

    function setMinimize(isMinimize: boolean) {
        isMinimized.value = isMinimize;
    }
    async function setTranslatedText(originText: string) {
        const response = await requestTranslatedText(originText);

        if (response.isSuccess) {
            translatedText.value = response.data;
        }
    }
    return {
        isMinimized,
        translatedText,
        setMinimize,
        setTranslatedText,
    };
});
