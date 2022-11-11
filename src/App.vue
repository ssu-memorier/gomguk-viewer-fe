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
        <paper-view :style="{ width: editorWidth + 'px' }"></paper-view>
        <div
            ref="$resizer"
            class="resizer"
            :style="{ transform: `translate(${editorWidth - 8}px)` }"
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
import PaperView from '@/views/Paper/PaperView.vue';
import EditorView from '@/views/EditorView.vue';
import FileLoadersView from '@/views/Loader/FileLoadersView.vue';
import CenterModal from '@/components/CenterModal.vue';
import { useModalStore } from '@/store/modal';
import { useFileStore } from '@/store/file';
import HEADER from '@/constants/HEADER';
import MESSAGE from '@/constants/MESSAGE';
import { ref, onMounted, computed } from 'vue';

const $main = ref();
const $resizer = ref();
const modalStore = useModalStore();
const fileStore = useFileStore();
const isResizing = ref<boolean>(false);
const editorPercent = ref<number>(0.5);
const mainWidth = ref<number>(0);
const editorWidth = computed(() => mainWidth.value * editorPercent.value);

onMounted(() => {
    mainWidth.value = $main.value.getBoundingClientRect().width;
});

window.addEventListener('resize', () => {
    mainWidth.value = $main.value.getBoundingClientRect().width;
});
function load() {
    modalStore.showModal();
}
async function save() {
    const isSuccess = await fileStore.updateFile();
    if (!isSuccess) {
        alert(MESSAGE.STORAGE.UPDATE_FAILED);
    }
}
function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    editorPercent.value = evt.clientX / mainWidth.value;
}
</script>

<style lang="scss">
@import '@/assets/scss/theme';
@import '@/assets/scss/mediaQuery';

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
    }
    div.resizer {
        position: absolute;
        z-index: 100;
        width: 16px;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        cursor: ew-resize;
        div.line {
            width: 2px;
            height: 100%;
            background-color: lightgray;
            transition: 0.3s;
        }
        &:hover {
            div.line {
                width: 16px;
            }
        }
    }
}
</style>
