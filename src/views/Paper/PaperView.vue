<template>
    <div class="container" ref="$paperView">
        <row-resizer class="row" :boxWidth="containerWidth" :left-percent="0.5">
            <template #left>
                <column-resizer
                    class="column"
                    :box-height="containerHeight"
                    :top-percent="0.75"
                >
                    <template #top>
                        <pdf-view></pdf-view>
                    </template>
                    <template #bottom>
                        <translator-view></translator-view>
                    </template>
                </column-resizer>
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
import ColumnResizer from '@/components/resizer/ColumnResizer.vue';
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
