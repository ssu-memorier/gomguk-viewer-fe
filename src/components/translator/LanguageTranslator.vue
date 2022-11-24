<template>
    <div class="translator">
        <button class="toggle" @click="toggleShowOriginText">
            {{
                isShowOriginText
                    ? TRANSLATOR.VIEW.SHOW_TRANSLATED
                    : TRANSLATOR.VIEW.SHOW_ORIGIN
            }}
        </button>
        {{ isShowOriginText ? originalText : translatedText }}
        <div class="container otherMeans" v-show="allKinds.length > 0">
            <other-means
                v-for="(kind, idx) in allKinds"
                :key="kind"
                :kind="kind"
                :means="allMeans[idx]"
            ></other-means>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * LanguageTranslator는 텍스트를 입력하면 번역된 결과를 보여주는 컴포넌트 입니다.
 */
import { ref, computed } from 'vue';
import { useTranslatorStore } from '@/store/translator';
import TRANSLATOR from '@/constants/TRANSLATOR';
import OtherMeans from '@/components/translator/OtherMeans.vue';
import { storeToRefs } from 'pinia';
const translatorStore = useTranslatorStore();
const { allTranslations, originalText, translatedText } =
    storeToRefs(translatorStore);
const isShowOriginText = ref<boolean>(false);
const allKinds = computed(() => {
    const allTrans = allTranslations.value;
    return allTrans ? Object.keys(allTrans) : [];
});
const allMeans = computed(() => {
    const allTrans = allTranslations.value;
    return allTrans ? Object.values(allTrans) : [];
});

function toggleShowOriginText() {
    isShowOriginText.value = !isShowOriginText.value;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/TRANSLATOR';
div.translator {
    position: relative;
    height: 100%;
    background-color: $TRANSLATOR-BG-COLOR;
    overflow: auto;
    color: $TRANSLATOR-COLOR;
    font-size: $TRANSLATOR-FONT-SIZE;
    button.toggle {
        float: right;
        background-color: $SURFACE-COLOR;
        border: 1px solid $BORDER-COLOR;
        border-radius: $BORDER-RADIUS__ROUND;
        cursor: pointer;

        &:hover {
            background-color: $SURFACE-COLOR__HOVER;
        }
    }
    .container.otherMeans {
        border-top: 1px solid $BORDER-COLOR__LIGHT;
    }
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
</style>
