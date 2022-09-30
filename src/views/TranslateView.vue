<template>
    <div class="translate">
        <textarea
            :placeholder="TRANSLATE.PLACEHOLDER"
            v-model="originText"
        ></textarea>
        <textarea
            class="translateResult"
            :value="translateText"
            disabled
        ></textarea>
    </div>
</template>

<script setup lang="ts">
/**
 * TrasnlateView는 텍스트를 입력하면 번역된 결과를 보여주는 뷰입니다.
 */
import { ref, watch } from 'vue';
import { requestTranslate } from '@/api/translate';
import TRANSLATE from '@/constants/TRANSLATE';
import createDebounce from '@/utils/createDebounce';
import DEBOUNCE from '@/constants/DEBOUNCE';

const originText = ref<string>('');
const translateText = ref<string>('');
const debounceTranslate = createDebounce(translate, DEBOUNCE.LATENCY);

/**
 * watch는 텍스트의 변경을 감지하고 콜백을 수행하는 역할을 합니다.
 */
watch(originText, (newValue) => {
    debounceTranslate(newValue);
});

async function translate(originText: string) {
    const response = await requestTranslate(originText);

    if (response) {
        translateText.value = response.text.translated;
    }
}
</script>
