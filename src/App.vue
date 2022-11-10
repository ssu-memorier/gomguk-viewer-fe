<template>
    <header class="card">
        <div class="center">
            <b class="appName">{{ HEADER.VIEW.TITLE }}</b>
            <menu>
                <button @click="load">
                    {{ HEADER.VIEW.MENU.LOAD }}
                </button>
                <button @click="save">{{ HEADER.VIEW.MENU.SAVE }}</button>
            </menu>
        </div>
    </header>
    <main ref="$main" @mousemove="resize" @mouseup="resizeEnd">
        <section ref="$viewerSection" :style="{ width: editorWidth + 'px' }">
            <pdf-view class="pdfView"></pdf-view>
            <translator-view class="translatorView"></translator-view>
        </section>
        <div
            ref="$resizer"
            class="resizer"
            :style="{ transform: `translateX(${editorWidth - 4}px)` }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <section
            ref="$editorSection"
            :style="{ width: mainWidth - editorWidth + 'px' }"
        >
            <editor-view></editor-view>
        </section>
    </main>
    <center-modal :show="modalStore.isShow">
        <file-loaders-view></file-loaders-view>
    </center-modal>
</template>

<script setup lang="ts">
import PdfView from '@/views/PdfView.vue';
import TranslatorView from '@/views/TranslatorView.vue';
import EditorView from '@/views/EditorView.vue';
import FileLoadersView from '@/views/Loader/FileLoadersView.vue';
import CenterModal from '@/components/CenterModal.vue';
import { useModalStore } from '@/store/modal';
import { useFileStore } from '@/store/file';
import HEADER from '@/constants/HEADER';
import MESSAGE from '@/constants/MESSAGE';
import { ref, onMounted } from 'vue';

const $main = ref();
const $resizer = ref();
const modalStore = useModalStore();
const fileStore = useFileStore();
function load() {
    modalStore.showModal();
}
async function save() {
    const isSuccess = await fileStore.updateFile();
    if (!isSuccess) {
        alert(MESSAGE.STORAGE.UPDATE_FAILED);
    }
}
const isResizing = ref<boolean>(false);
const editorWidth = ref<number>(0);
const mainWidth = ref<number>(0);
onMounted(() => {
    mainWidth.value = $main.value.getBoundingClientRect().width;
    editorWidth.value = mainWidth.value / 2;
});

window.addEventListener('resize', () => {
    mainWidth.value = $main.value.getBoundingClientRect().width;
});
function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    editorWidth.value = evt.clientX;
}
</script>

<style lang="scss">
@import '@/assets/scss/theme';
@import '@/assets/scss/mediaQuery';
@import '@/assets/scss/constants/TRANSLATOR';

* {
    box-sizing: border-box;
}
html,
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: $bg-color;
}
#app {
    position: absolute;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100vw;
    height: 100vh;
}
header {
    position: relative;
    box-sizing: border-box;
    height: $header-height;
    background-color: $SURFACE-COLOR;
    padding: 0.5rem 2rem;
    z-index: 200;
    .center {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: $screen-main-max-width;
    }
    .appName {
        font-weight: bold;
        font-size: 1.6rem;
    }
}
main {
    position: relative;
    height: calc(100% - $header-height);
    width: 100%;
    margin: 0;
    z-index: 10;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    section {
        height: 100%;
        display: flex;
        flex-direction: column;
        .pdfView {
            flex-grow: 1;
        }
        .translatorView {
            flex-shrink: 0;
            width: $TRANSLATOR-COL-MODE-WIDTH;
            height: $TRANSLATOR-COL-MODE-HEIGHT;
        }
    }
    div.resizer {
        position: absolute;
        z-index: 100;
        width: 8px;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        cursor: e-resize;
        div.line {
            width: 2px;
            height: 100%;
            background-color: lightgray;
            transition: 0.3s;
        }
        &:hover {
            div.line {
                width: 8px;
            }
        }
    }
}
</style>
