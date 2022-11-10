<template>
    <h2>{{ LOADER.VIEW.TITLE }}</h2>
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
menu {
    display: flex;
    flex-direction: row;

    button.item {
        padding: 0 8px;
    }
}
</style>
