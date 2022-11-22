<template>
    <header>
        <masthead-view class="center"></masthead-view>
    </header>
    <main ref="$main">
        <guide-view class="guideView" v-if="!pdfStore.isPdfExist"></guide-view>
        <row-resizer class="resizeBox" v-else :left-percent="0.5">
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
    <div class="dropdown profileMenu" v-show="modalStore.isShowProfileMenu">
        <logout-button></logout-button>
    </div>
    <div class="dropdown loginMethods" v-show="modalStore.isShowLoginMethods">
        <kakao-login-button></kakao-login-button>
        <google-login-button></google-login-button>
    </div>
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
import MastheadView from '@/views/MastheadView.vue';
import GuideView from '@/views/GuideView.vue';
import LogoutButton from '@/components/button/LogoutButton.vue';
import KakaoLoginButton from '@/components/button/KakaoLoginButton.vue';
import GoogleLoginButton from '@/components/button/GoogleLoginButton.vue';
import { useModalStore } from '@/store/modal';
import { useUserStore } from '@/store/user';
import { usePdfStore } from '@/store/file/pdf';
/**
 * TODO: 제거 예정
 */
import axios from 'axios';

const $main = ref();
const userStore = useUserStore();
const modalStore = useModalStore();
const pdfStore = usePdfStore();
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
</script>

<style lang="scss">
@import '@/assets/scss/layout';
@import '@/assets/scss/theme';
@import '@/assets/scss/mediaQuery';
@import '@/assets/scss/constants/MASTHEAD';
* {
    box-sizing: border-box;
}
html,
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: $BG-COLOR;
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
    height: $HEADER-HEIGHT;
    background-color: $SURFACE-COLOR;
    box-shadow: $SHADOW__2DP;
    z-index: 200;
    .center {
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
main {
    position: relative;
    height: calc(100% - $HEADER-HEIGHT);
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
.profileMenu,
.loginMethods {
    position: absolute;
    right: $VERTICAL-PADDING;
    top: calc($HEADER-HEIGHT + 8px);
    z-index: 1000;
    border-radius: $BORDER-RADIUS__16;
    box-shadow: $SHADOW__6DP;
    background-color: $SURFACE-COLOR;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
}
.loginMethods > * {
    margin-bottom: 0.5rem;
}
.loginMethods > *:last-child {
    margin-bottom: 0;
}
.guideView {
    width: 100%;
    height: 100%;
    background-color: transparent;
}
.view {
    width: 100%;
    height: 100%;
}
</style>
