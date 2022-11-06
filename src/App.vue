<template>
    <header class="card">
        <div class="center">
            <b class="appName">곰국 뷰어</b>
            <button @click="modalStore.showModal">파일 불러오기</button>
        </div>
    </header>
    <main>
        <section>
            <pdf-view class="pdfView"></pdf-view>
            <translator-view class="translatorView"></translator-view>
        </section>
    </main>
    <center-modal :show="modalStore.isShow">
        <file-loaders-view></file-loaders-view>
    </center-modal>
</template>

<script setup lang="ts">
import PdfView from '@/views/PdfView.vue';
import TranslatorView from '@/views/TranslatorView.vue';
import CenterModal from '@/components/CenterModal.vue';
import FileLoadersView from '@/views/Loader/FileLoadersView.vue';
import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();
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
    background-color: $surface-color;
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
    overflow: hidden;
    section {
        height: 100%;
        width: 100%;
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
}

@include desktop {
    main {
        section {
            flex-direction: row;
            .translatorView {
                width: $TRANSLATOR-ROW-MODE-WIDTH;
                height: $TRANSLATOR-ROW-MODE-HEIGHT;
            }
        }
    }
}
</style>
