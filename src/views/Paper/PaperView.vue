<template>
    <div class="container" ref="$paperView">
        <row-partition
            class="row"
            :boxWidth="containerWidth"
            :left-percent="0.5"
        >
            <template #left>
                <div class="pdfView">
                    <pdf-view></pdf-view>
                    <column-resizer
                        :base="base"
                        :height="200"
                        :max="600"
                        :min="40"
                        class="translatorView"
                        ref="$translatorContainer"
                    >
                        <translator-view></translator-view>
                    </column-resizer>
                </div>
            </template>
            <template #right>
                <editor-view></editor-view>
            </template>
        </row-partition>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RowPartition from '@/components/resizer/RowPartition.vue';
import ColumnResizer from '@/components/resizer/ColumnResizer.vue';
import EditorView from '@/views/EditorView.vue';
import TranslatorView from '@/views/Paper/TranslatorView.vue';
import PdfView from '@/views/Paper/PdfView.vue';

const $paperView = ref();
const $translatorContainer = ref();
const containerWidth = ref<number>(0);
const containerHeight = ref<number>(0);
const base = ref<number>(0);
onMounted(() => {
    setContainerSize();
    setTranslatorPos();
});

window.addEventListener('resize', () => {
    setContainerSize();
    setTranslatorPos();
});

function setContainerSize() {
    const rect = $paperView.value.getBoundingClientRect();

    containerWidth.value = rect.width;
    containerHeight.value = rect.height;
}
function setTranslatorPos() {
    const rect = $translatorContainer.value.$el.getBoundingClientRect();
    base.value = rect.bottom;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';
.row {
    height: 100%;
}
.pdfView {
    height: 100%;
}
.translatorView {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    width: 80%;
    max-width: 800px;
    height: 200px;
    transform: translateX(-50%);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: $SHADOW__6DP;
    background-color: $SURFACE-COLOR;
}
</style>
