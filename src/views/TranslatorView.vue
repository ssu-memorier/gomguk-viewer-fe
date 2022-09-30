<template>
    <div
        class="translatorView card"
        :class="{
            leftTop: position === POSITION.LEFT_TOP,
            rightTop: position === POSITION.RIGHT_TOP,
        }"
    >
        <div class="translatorHeader">
            <span class="name">{{ TRANSLATE.VIEW.NAME }}</span>
            <span>
                <button class="position" @click="positionHandler">
                    {{
                        position === POSITION.LEFT_TOP
                            ? TRANSLATE.VIEW.RIGHT_TOP
                            : TRANSLATE.VIEW.LEFT_TOP
                    }}
                </button>
                <button class="minimize" @click="minimizeHandler">
                    {{
                        isMinimized ? TRANSLATE.VIEW.OPEN : TRANSLATE.VIEW.CLOSE
                    }}
                </button>
            </span>
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
import TRANSLATE from '@/constants/TRANSLATE';
import POSITION from '@/constants/POSITION';
import type { PositionType } from '@/types/PositionType';
import LanguageTranslator from '@/components/LanguageTranslator.vue';

const isMinimized = ref<boolean>(false);
const position = ref<PositionType>(POSITION.RIGHT_TOP);

function minimizeHandler() {
    isMinimized.value = !isMinimized.value;
}
function positionHandler() {
    if (position.value === POSITION.LEFT_TOP) {
        position.value = POSITION.RIGHT_TOP;
    } else {
        position.value = POSITION.LEFT_TOP;
    }
}
</script>

<style lang="scss" scoped>
div.translatorView {
    position: fixed;
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
div.translatorView.leftTop {
    top: calc(var(--header-height) + 20px);
    left: 20px;
}
div.translatorView.rightTop {
    top: calc(var(--header-height) + 20px);
    right: 20px;
}
</style>
