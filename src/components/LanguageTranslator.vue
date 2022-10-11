<template>
    <div class="translatorTextarea">
        <textarea
            class="origin"
            :placeholder="TRANSLATOR.VIEW.PLACEHOLDER"
            v-model="translatorStore.originalText"
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
import TRANSLATOR from '@/constants/TRANSLATOR';
import { useTranslatorStore } from '@/store/translator';

const translatorStore = useTranslatorStore();
</script>

<style lang="scss" scoped>
div.translatorTextarea {
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
