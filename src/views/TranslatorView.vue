<template>
    <div class="translatorView card">
        <div class="translatorHeader">
            <div class="translatorLanguageSelect">
                <select @change="sourceLanguageHandler">
                    <option
                        v-for="LANG in LANGUAGES"
                        :key="LANG.KEY"
                        :value="LANG.KEY"
                        :selected="LANG.KEY === translatorStore.source"
                    >
                        {{ LANG.NAME }}
                    </option>
                </select>
                <select @change="targetLanguageHandler">
                    <option
                        v-for="LANG in LANGUAGES"
                        :key="LANG.KEY"
                        :value="LANG.KEY"
                        :selected="LANG.KEY === translatorStore.target"
                    >
                        {{ LANG.NAME }}
                    </option>
                </select>
            </div>
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
import TRANSLATOR from '@/constants/TRANSLATOR';
import LANGUAGES from '@/constants/TRANSLATOR/LANGUAGES';
import LanguageTranslator from '@/components/LanguageTranslator.vue';
import { useTranslatorStore } from '@/store/translator';
import { LanguageType } from '@/types/LanguageType';

const translatorStore = useTranslatorStore();
const isMinimized = ref<boolean>(false);

function sourceLanguageHandler(evt: Event) {
    const $target = evt.target as HTMLOptionElement;
    translatorStore.setSourceLanguage($target.value as LanguageType);
}

function targetLanguageHandler(evt: Event) {
    const $target = evt.target as HTMLOptionElement;
    translatorStore.setTargetLanguage($target.value as LanguageType);
}
</script>

<style lang="scss" scoped>
div.translatorView {
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    div.translatorHeader {
        height: 30px;
        flex-shrink: 0;
        padding: 0.5rem;
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
