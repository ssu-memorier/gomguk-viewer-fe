<template>
    <div class="translatorTextarea">
        <button @click="toggleShowOriginText">
            {{
                isShowOriginText
                    ? TRANSLATOR.VIEW.SHOW_TRANSLATED
                    : TRANSLATOR.VIEW.SHOW_ORIGIN
            }}
        </button>
        <div class="translated" disabled>
            {{
                isShowOriginText
                    ? translatorStore.originalText
                    : translatorStore.translatedText
            }}
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * LanguageTranslator는 텍스트를 입력하면 번역된 결과를 보여주는 컴포넌트 입니다.
 */
import { ref } from 'vue';
import { useTranslatorStore } from '@/store/translator';
import TRANSLATOR from '@/constants/TRANSLATOR';
const translatorStore = useTranslatorStore();
const isShowOriginText = ref<boolean>(false);

function toggleShowOriginText() {
    isShowOriginText.value = !isShowOriginText.value;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/translator';
div.translatorTextarea {
    width: 100%;
    display: flex;
    flex-direction: column;
    textarea.origin,
    div.translated {
        color: #{$translator-color};
        font-size: 1.4rem;
        border: none;
        padding: 1rem;
        box-sizing: border-box;
        background-color: #{$translator-bg-color};
        text-align: left;
        margin: 0;
        flex-grow: 1;
        height: 50%;
    }
    textarea.origin {
        resize: none;
    }
    textarea:focus {
        outline: none;
    }
    div.translated {
        overflow: scroll;
    }
}
</style>
