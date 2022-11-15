<template>
    <header class="card">
        <div class="center">
            <b class="appName">{{ HEADER.VIEW.TITLE }}</b>
            <menu>
                <button @click="load">
                    {{ HEADER.VIEW.MENU.LOAD }}
                </button>
                <button @click="save">{{ HEADER.VIEW.MENU.SAVE }}</button>
                <button @click="login">{{ HEADER.VIEW.MENU.LOGIN }}</button>
            </menu>
        </div>
    </header>
    <main ref="$main">
        <row-resizer class="resizeBox" :left-percent="0.5">
            <template #left>
                <column-resizer class="resizeBox" :top-percent="0.75">
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
    </main>
    <center-modal :show="modalStore.isShow">
        <file-loaders-view></file-loaders-view>
    </center-modal>
</template>

<script setup lang="ts">
import RowResizer from '@/components/resizer/RowResizer.vue';
import ColumnResizer from '@/components/resizer/ColumnResizer.vue';
import PdfView from '@/views/Paper/PdfView.vue';
import TranslatorView from '@/views/Paper/TranslatorView.vue';
import EditorView from '@/views/EditorView.vue';
import FileLoadersView from '@/views/Loader/FileLoadersView.vue';
import CenterModal from '@/components/CenterModal.vue';
import { useModalStore } from '@/store/modal';
import { useFileStore } from '@/store/file';
import HEADER from '@/constants/HEADER';
import MESSAGE from '@/constants/MESSAGE';
import { ref } from 'vue';

const $main = ref();

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

function login() {
    /**
     * TODO: 로그인 View 생성 및 로그인 연결
     * 로그인 버튼 클릭 시 카카오 구글 버튼이 보이는 modal이 나타나고
     * 클릭시 로그인 페이지로 이어진다.
     */
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    div.resizeBox {
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 100%;
    }
}
.view {
    width: 100%;
    height: 100%;
}
</style>
