<template>
    <header class="card">
        <div class="center">
            <b class="appName">{{ HEADER.VIEW.TITLE }}</b>
            <menu>
                <button @click="load">
                    {{ HEADER.VIEW.MENU.LOAD }}
                </button>
                <button @click="save">{{ HEADER.VIEW.MENU.SAVE }}</button>

                <logout-button v-if="userStore.isLoggined">{{
                    HEADER.VIEW.MENU.LOGOUT
                }}</logout-button>
                <login-button v-else>{{ HEADER.VIEW.MENU.LOGIN }}</login-button>
                {{ userStore.userName }}
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
    <center-modal v-if="modalStore.isShow">
        <file-loaders-view></file-loaders-view>
    </center-modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RowResizer from '@/components/resizer/RowResizer.vue';
import ColumnResizer from '@/components/resizer/ColumnResizer.vue';
import PdfView from '@/views/Paper/PdfView.vue';
import TranslatorView from '@/views/Paper/TranslatorView.vue';
import EditorView from '@/views/EditorView.vue';
import FileLoadersView from '@/views/Loader/FileLoadersView.vue';
import CenterModal from '@/components/CenterModal.vue';
import LoginButton from './components/button/LoginButton.vue';
import LogoutButton from './components/button/LogoutButton.vue';
import { useModalStore } from '@/store/modal';
import { useFileStore } from '@/store/file';
import { useUserStore } from '@/store/user';
import HEADER from '@/constants/HEADER';
import MESSAGE from '@/constants/MESSAGE';
/**
 * TODO: 제거 예정
 */
import axios from 'axios';

const $main = ref();

const modalStore = useModalStore();
const fileStore = useFileStore();
const userStore = useUserStore();

/**
 * TODO: 추후 제거 예정
 *
 * 아래 로직은 ajax 요청의 결과가 401인 경우 로그아웃을 시키는 로직으로 추후 get~~Model 유틸에 흡수할 예정입니다.
 * 현재는 model이 여러 곳으로 쪼개져 있어 임시로 이 곳에서 401을 처리하도록 하지만
 * 추후 gateway를 통해 통합된 model을 제공할 예정이기 때문에 그 때 이 로직을 제거하고 통합된 model에서 401을 처리하게 할 것입니다.
 */
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response.status === 401) {
            userStore.isLoggined = false;
        }
    }
);

onMounted(async () => {
    await userStore.getProfile();
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
