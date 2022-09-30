<template>
    <div class="translatorView">
        <div class="translatorHeader">
            <span class="name">{{ TRANSLATE.VIEW.NAME }}</span>
            <button class="minimize" @click="minimizeHandler">
                {{ isMinimized ? TRANSLATE.VIEW.OPEN : TRANSLATE.VIEW.CLOSE }}
            </button>
        </div>
        <language-translator
            class="translator"
            v-show="!isMinimized"
        ></language-translator>
    </div>
</template>

<script setup lang="ts">
/**
 * TrasnlateView는 텍스트를 입력하면 번역된 결과를 보여주는 뷰입니다.
 */
import { ref } from 'vue';
import TRANSLATE from '@/constants/TRANSLATE';
import LanguageTranslator from '@/components/LanguageTranslator.vue';

const isMinimized = ref<boolean>(false);
function minimizeHandler() {
    isMinimized.value = !isMinimized.value;
}
</script>

<style lang="scss" scoped>
div.translatorView {
    border-radius: var(--border-radius);
    width: 400px;
    height: fit-content;
    overflow: hidden;
    div.translatorHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5rem;
        background-color: #ccc;
        button {
            cursor: pointer;
        }
    }
    .translator {
        height: 600px;
    }
}
</style>
