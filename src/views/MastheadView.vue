<template>
    <div id="mastheadView">
        <site-logo></site-logo>
        <span class="fileName" :title="pdfStore.fileName">{{
            pdfStore.fileName
        }}</span>
        <menu v-if="userStore.isLoggined">
            <round-button
                class="save"
                @click="save"
                :title="HEADER.VIEW.MENU.SAVE"
            >
                <img src="@/assets/images/svg/save.svg" />
            </round-button>
            <round-button
                class="load"
                @click="load"
                :title="HEADER.VIEW.MENU.LOAD"
            >
                <img src="@/assets/images/svg/folder.svg" />
            </round-button>

            <profile-button
                class="profile"
                @click="toggleProfileMenu"
            ></profile-button>
        </menu>
        <menu v-else>
            <round-button
                class="load"
                @click="load"
                :title="HEADER.VIEW.MENU.LOAD"
            >
                <img src="@/assets/images/svg/folder.svg" />
            </round-button>
            <login-button>{{ HEADER.VIEW.MENU.LOGIN }}</login-button>
        </menu>
    </div>
</template>

<script setup lang="ts">
import SiteLogo from '@/components/SiteLogo.vue';
import LoginButton from '@/components/button/LoginButton.vue';
import { useFileStore } from '@/store/file';
import { useModalStore } from '@/store/modal';
import { useUserStore } from '@/store/user';
import HEADER from '@/constants/HEADER';
import RoundButton from '@/components/button/RoundButton.vue';
import ProfileButton from '@/components/button/ProfileButton.vue';
import { usePdfStore } from '@/store/file/pdf';

const modalStore = useModalStore();
const fileStore = useFileStore();
const pdfStore = usePdfStore();
const userStore = useUserStore();

function load() {
    modalStore.showModal();
}
async function save() {
    await fileStore.updateFile();
}

function toggleProfileMenu() {
    modalStore.toggleProfileMenu();
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants/MASTHEAD';
#mastheadView {
    width: 100%;
    padding: 0 $VERTICAL-PADDING;
    height: $MASTHEAD-HEIGHT;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span.fileName {
        margin: auto 0;
        text-align: center;
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 800;
    }
    menu {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        & > * {
            margin-right: 16px;
            margin-top: auto;
            margin-bottom: auto;
        }
        & > *:last-child {
            margin-right: 0;
        }
        .load,
        .save,
        .profile {
            width: 40px;
            height: 40px;
            margin-top: auto;
            margin-bottom: auto;

            img {
                aspect-ratio: 1 / 1;
                width: 28px;
            }
        }
    }
}
</style>
