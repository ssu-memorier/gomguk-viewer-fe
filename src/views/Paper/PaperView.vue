<template>
    <section
        class="paper"
        ref="$paper"
        @mouseup.stop="resizeEnd"
        @mousemove="resize"
    >
        <pdf-view
            class="pdfView"
            :style="{ height: pdfHight + 'px' }"
        ></pdf-view>
        <div
            class="resizer"
            :style="{ transform: `translateY(${pdfHight - 8}px)` }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <translator-view
            class="translatorView"
            :style="{ height: translatorHeight + 'px' }"
        ></translator-view>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import PdfView from '@/views/Paper/PdfView.vue';
import TranslatorView from '@/views/Paper/TranslatorView.vue';

const $paper = ref();
const paperHeight = ref<number>(0);
const paperOffset = ref<number>(0);
const pdfPercent = ref<number>(0.75);
const isResizing = ref<boolean>(false);
const pdfHight = computed(() => paperHeight.value * pdfPercent.value);
const translatorHeight = computed(() => paperHeight.value - pdfHight.value);

onMounted(() => {
    const rect = $paper.value.getBoundingClientRect();
    paperHeight.value = rect.height;
    paperOffset.value = rect.y;
});
window.addEventListener('resize', () => {
    paperHeight.value = $paper.value.getBoundingClientRect().height;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    pdfPercent.value = (evt.clientY - paperOffset.value) / paperHeight.value;
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/constants/TRANSLATOR';
section.paper {
    position: relative;
    .pdfView {
        flex-grow: 1;
        z-index: 10;
    }
    .translatorView {
        flex-shrink: 0;
        width: $TRANSLATOR-COL-MODE-WIDTH;
        height: $TRANSLATOR-COL-MODE-HEIGHT;

        z-index: 10;
    }
}
div.resizer {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: ns-resize;
    div.line {
        width: 100%;
        height: 2px;
        background-color: lightgray;
        transition: 0.3s;
    }
    &:hover {
        div.line {
            width: 100%;
            height: 16px;
        }
    }
}
</style>
