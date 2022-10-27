<template>
    <div class="translator">
        <button class="toggle" @click="toggleShowOriginText">
            {{
                isShowOriginText
                    ? TRANSLATOR.VIEW.SHOW_TRANSLATED
                    : TRANSLATOR.VIEW.SHOW_ORIGIN
            }}
        </button>
        <div class="translated">
            {{
                isShowOriginText
                    ? translatorStore.originalText
                    : translatorStore.translatedText
            }}
        </div>
        <hr v-show="otherMeansExist" />
        <div v-show="otherMeansExist">
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
const translatorStore = useTranslatorStore();
const isShowOriginText = ref<boolean>(false);
const otherMeansExist = computed(() => !!translatorStore.allTranslations);
const allKinds = computed(() => {
    const allTrans = translatorStore.allTranslations;
    return allTrans ? Object.keys(allTrans) : [];
});
const allMeans = computed(() => {
    const allTrans = translatorStore.allTranslations;
    return allTrans ? Object.values(allTrans) : [];
});

function toggleShowOriginText() {
    isShowOriginText.value = !isShowOriginText.value;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/constants/TRANSLATOR';
div.translator {
    position: relative;
    background-color: $TRANSLATOR-BG-COLOR;
    overflow: auto;
    height: 100%;
    .toggle {
        width: 100%;
    }
}

div.translated {
    color: $TRANSLATOR-COLOR;
    font-size: $TRANSLATOR-FONT-SIZE;
    border: none;
    padding: $TRANSLATOR-PADDING;
    box-sizing: border-box;
    text-align: left;
    margin: 0;
    flex-grow: 1;
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
