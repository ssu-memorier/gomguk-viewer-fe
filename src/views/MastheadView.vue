<template>
    <div id="mastheadView">
        <site-logo></site-logo>
        <menu v-if="userStore.isLoggined">
            <round-button
                class="load"
                @click="load"
                :title="HEADER.VIEW.MENU.LOAD"
            >
                <img src="@/assets/images/svg/folder.svg" />
            </round-button>
            <round-button
                class="save"
                @click="save"
                :title="HEADER.VIEW.MENU.SAVE"
            >
                <img src="@/assets/images/svg/save.svg" />
            </round-button>
            <profile-button class="profile"></profile-button>
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
import MESSAGE from '@/constants/MESSAGE';
import HEADER from '@/constants/HEADER';
import RoundButton from '@/components/button/RoundButton.vue';
import ProfileButton from '@/components/button/ProfileButton.vue';

const modalStore = useModalStore();
const fileStore = useFileStore();
const userStore = useUserStore();

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
<style lang="scss" scoped>
@import '@/assets/scss/constants/MASTHEAD';
#mastheadView {
    width: 100%;
    padding: 0 24px;
    height: $MASTHEAD-HEIGHT;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    menu {
        .load {
            width: 48px;
        }
        .save {
            width: 48px;
        }
        .profile {
            width: 48px;
        }
    }
}
</style>
