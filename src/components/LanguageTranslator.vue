<template>
    <div class="translateTextarea">
        <textarea
            class="origin"
            :placeholder="TRANSLATE.VIEW.PLACEHOLDER"
            v-model="originText"
        ></textarea>
        <div class="translated" disabled>{{ translateText }}</div>
    </div>
</template>

<script setup lang="ts">
/**
 * TrasnlateTextarea는 텍스트를 입력하면 번역된 결과를 보여주는 뷰입니다.
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

<style lang="scss" scoped>
div.translateTextarea {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    textarea.origin,
    div.translated {
        color: #333;
        font-size: 1.4rem;
        border: none;
        padding: 1rem;
        box-sizing: border-box;
        background-color: #fff;
        text-align: left;
        margin: 0;
        flex-grow: 1;
        height: 50%;
    }
    textarea.origin {
        resize: none;
        border-bottom: 1px solid #ddd;
    }
    textarea:focus {
        outline: none;
    }
    div.translated {
        overflow: scroll;
    }
    hr {
        margin: 0;
        border-color: #eee;
        background-color: #eee;
    }
}
</style>
