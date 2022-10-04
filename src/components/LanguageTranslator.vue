<template>
    <div class="translateTextarea">
        <textarea
            class="origin"
            :placeholder="TRANSLATE.VIEW.PLACEHOLDER"
            v-model="originText"
        ></textarea>
        <div class="translated" disabled>
            {{ translatorStore.translatedText }}
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * LanguageTranslator는 텍스트를 입력하면 번역된 결과를 보여주는 컴포넌트 입니다.
 */
import { ref, watch } from 'vue';
import TRANSLATE from '@/constants/TRANSLATE';
import createDebounce from '@/utils/createDebounce';
import { useTranslatorStore } from '@/store/translator';

const originText = ref<string>('');
const translatorStore = useTranslatorStore();
const debounceTranslate = createDebounce(
    translatorStore.setTranslatedText,
    TRANSLATE.LATENCY
);

watch(originText, (newValue) => {
    debounceTranslate(newValue);
});
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
