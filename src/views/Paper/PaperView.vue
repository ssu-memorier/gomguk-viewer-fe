<template>
    <div class="container" ref="$paperView">
        <row-resizer class="row" :boxWidth="containerWidth" :left-percent="0.5">
            <template #left>
                <div class="pdfView">
                    <pdf-view></pdf-view>
                    <div class="translatorView">
                        <translator-view></translator-view>
                    </div>
                </div>
            </template>
            <template #right>
                <editor-view></editor-view>
            </template>
        </row-resizer>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RowResizer from '@/components/resizer/RowResizer.vue';
import EditorView from '@/views/EditorView.vue';
import TranslatorView from '@/views/Paper/TranslatorView.vue';
import PdfView from '@/views/Paper/PdfView.vue';

const $paperView = ref();
const containerWidth = ref<number>(0);
const containerHeight = ref<number>(0);
onMounted(() => {
    setContainerSize();
});

window.addEventListener('resize', () => {
    setContainerSize();
});

function setContainerSize() {
    const rect = $paperView.value.getBoundingClientRect();

    containerWidth.value = rect.width;
    containerHeight.value = rect.height;
}
</script>
<style scoped lang="scss">
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
}
</style>
