<template>
    <div class="container">
        <div class="languageOptions">
            <language-selector
                @change="sourceLanguageHandler"
                :selected="translatorStore.source"
            ></language-selector>
            <img src="@/assets/images/svg/arrow-narrow-right.svg" />
            <language-selector
                @change="targetLanguageHandler"
                :selected="translatorStore.target"
            ></language-selector>
        </div>
        <hr />
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
import LanguageSelector from '@/components/selector/LanguageSelector.vue';
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
    padding: 1rem;
    display: flex;
    text-align: left;
    flex-direction: column;
    div.languageOptions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-shrink: 0;
        & > * {
            margin-right: 1rem;
        }
        & > *:last-child {
            margin-right: 0;
        }
        button {
            cursor: pointer;
        }
    }
    hr {
        width: 100%;
        height: 1px;
        border: none;
        flex-shrink: 0;
        background-color: $BORDER-COLOR__LIGHT;
    }
    .translator {
        flex-grow: 1;
        overflow: auto;
    }
}
</style>
