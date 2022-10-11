<template>
    <div
        class="translatorView card"
        :class="{
            leftTop: position === POSITION.LEFT_TOP,
            rightTop: position === POSITION.RIGHT_TOP,
        }"
    >
        <div class="translatorHeader">
            <span class="name">{{ TRANSLATOR.VIEW.NAME }}</span>
            <span>
                <button class="position" @click="positionHandler">
                    {{
                        position === POSITION.LEFT_TOP
                            ? TRANSLATOR.VIEW.RIGHT_TOP
                            : TRANSLATOR.VIEW.LEFT_TOP
                    }}
                </button>
                <button class="minimize" @click="minimizeHandler">
                    {{
                        isMinimized
                            ? TRANSLATOR.VIEW.OPEN
                            : TRANSLATOR.VIEW.CLOSE
                    }}
                </button>
            </span>
        </div>
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
import POSITION from '@/constants/POSITION';
import LANGUAGES from '@/constants/TRANSLATOR/LANGUAGES';
import type { TranslatorPosType } from '@/types/TranslatorPosType';
import LanguageTranslator from '@/components/LanguageTranslator.vue';
import { useTranslatorStore } from '@/store/translator';
import { LanguageType } from '@/types/LanguageType';

const translatorStore = useTranslatorStore();
const position = ref<TranslatorPosType>(POSITION.RIGHT_TOP);
const isMinimized = ref<boolean>(false);

translatorStore.$subscribe(() => {
    setMinimize(false);
});

function setMinimize(isMinimize: boolean) {
    isMinimized.value = isMinimize;
}

function minimizeHandler() {
    setMinimize(!isMinimized.value);
}

function positionHandler() {
    if (position.value === POSITION.LEFT_TOP) {
        position.value = POSITION.RIGHT_TOP;
    } else {
        position.value = POSITION.LEFT_TOP;
    }
}

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
    position: fixed;
    z-index: 100;
    border-radius: var(--border-radius);
    width: 400px;
    height: fit-content;
    overflow: hidden;
    background-color: #ccc;
    div.translatorHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5rem;
        button {
            cursor: pointer;
        }
    }
    .translator {
        height: 600px;
    }
}
div.translatorView.leftTop {
    top: calc(var(--header-height) + 20px);
    left: 20px;
}
div.translatorView.rightTop {
    top: calc(var(--header-height) + 20px);
    right: 20px;
}
</style>
