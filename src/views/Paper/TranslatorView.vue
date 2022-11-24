<template>
    <div class="container">
        <div class="translatorLanguageSelect">
            <langague-selector
                @change="sourceLanguageHandler"
                :selected="translatorStore.source"
            ></langague-selector>
            <langague-selector
                @change="targetLanguageHandler"
                :selected="translatorStore.target"
            ></langague-selector>
        </div>
        <language-translator
            class="translator"
            v-show="!isMinimized"
        ></language-translator>
    </div>
</template>

<script setup lang="ts">
/**
 * TrasnlatorView는 텍스트를 입력하면 번역된 결과를 보여주는 뷰입니다.
 */
import { ref } from 'vue';
import LanguageTranslator from '@/components/translator/LanguageTranslator.vue';
import LangagueSelector from '@/components/selector/LangagueSelector.vue';
import { useTranslatorStore } from '@/store/translator';
import { LanguageType } from '@/types/LanguageType';

const translatorStore = useTranslatorStore();
const isMinimized = ref<boolean>(false);

function sourceLanguageHandler(lang: LanguageType) {
    translatorStore.setSourceLanguage(lang);
}

function targetLanguageHandler(lang: LanguageType) {
    translatorStore.setTargetLanguage(lang);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/constants/TRANSLATOR';
@import '@/assets/scss/theme';
div.container {
    width: 100%;
    height: 100%;
    background-color: $SURFACE-COLOR;
    display: flex;
    flex-direction: column;
    div.translatorLanguageSelect {
        flex-shrink: 0;
        padding: $TRANSLATOR-LANGUAGE-SELECTOR-PADDING;
        border-bottom: 1px solid $BORDER-COLOR;
        button {
            cursor: pointer;
        }
    }
    .translator {
        flex-grow: 1;
        overflow: auto;
    }
}
</style>
