<template>
    <div class="container">
        <div class="header">
            <img class="icon folder" src="@/assets/images/svg/folder.svg" />
            <h2>{{ LOADER.VIEW.TITLE }}</h2>
            <button class="close" @click="modalStore.hideModal">
                <img class="icon" src="@/assets/images/svg/Times.svg" />
            </button>
        </div>
        <menu>
            <button
                class="item"
                v-for="(tab, idx) in tabs"
                :key="tab.name"
                @click="changeCurrentTab(tab.name as LoaderTabType)"
            >
                {{ LOADER.TABS[idx].NAME }}
            </button>
        </menu>
        <component
            :is="tabs[currentTab]"
            @loadfile="modalStore.hideModal"
        ></component>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StorageLoadView from '@/views/Loader/StorageLoadView.vue';
import FileUploadView from '@/views/Loader/FileUploadView.vue';
import LOADER from '@/constants/LOADER';
import { LoaderTabType } from '@/types/LoaderTabType';
import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();
const currentTab = ref<number>(0);
const tabs = ref([StorageLoadView, FileUploadView]);

function changeCurrentTab(tabName: LoaderTabType) {
    const idx = tabs.value.findIndex((tab) => tab.name === tabName);
    currentTab.value = idx;
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/theme';
.container {
    .header {
        display: flex;
        flex-direction: row;
        padding: 0 1rem;
        font: $HEADER__2;
        border-bottom: 2px solid $BORDER-COLOR;
        img.icon.folder {
            margin-right: 1rem;
        }
        h2 {
            flex-grow: 1;
            text-align: start;
        }
        .close {
            width: fit-content;
            height: fit-content;
            margin: auto 0;
            border: 0;
            background-color: transparent;
            cursor: pointer;
        }
    }
    menu {
        display: flex;
        flex-direction: row;

        button.item {
            padding: 0 8px;
        }
    }
}
</style>
