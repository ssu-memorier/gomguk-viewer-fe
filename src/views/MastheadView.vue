<template>
    <div>
        <site-logo></site-logo>
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
</template>

<script setup lang="ts">
import SiteLogo from '@/components/SiteLogo.vue';
import { useFileStore } from '@/store/file';
import { useModalStore } from '@/store/modal';
import { useUserStore } from '@/store/user';
import MESSAGE from '@/constants/MESSAGE';
import HEADER from '@/constants/HEADER';

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
<style lang="scss" scoped></style>
