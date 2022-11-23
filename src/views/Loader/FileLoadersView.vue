<template>
    <div class="container">
        <div class="header">
            <img class="icon folder" src="@/assets/images/svg/folder.svg" />
            <h2>{{ LOADER.VIEW.TITLE }}</h2>
            <round-button class="close" @click="modalStore.hideModal">
                <img class="icon" src="@/assets/images/svg/Times.svg" />
            </round-button>
        </div>
        <menu>
            <button
                class="item"
                v-for="name in tabNames"
                :key="name"
                @click="changeCurrentTab(name)"
            >
                {{ LOADER.TABS[name].NAME }}
            </button>
        </menu>
        <component
            :is="tabs[currentTab]"
            @loadfile="modalStore.hideModal"
        ></component>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import StorageLoadView from '@/views/Loader/StorageLoadView.vue';
import FileUploadView from '@/views/Loader/FileUploadView.vue';
import LocalFileLoadView from '@/views/Loader/LocalFileLoadView.vue';
import RoundButton from '@/components/button/RoundButton.vue';
import LOADER from '@/constants/LOADER';
import { LoaderTabType } from '@/types/LoaderTabType';
import { useModalStore } from '@/store/modal';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const userStore = useUserStore();
const currentTab = ref<number>(0);
const tabs = ref([StorageLoadView, FileUploadView]);
const { isLoggined } = storeToRefs(userStore);
const tabNames = computed<LoaderTabType[]>(() => {
    return tabs.value.map((tab) => tab.name as LoaderTabType);
});

watchEffect(() => {
    if (isLoggined.value) {
        tabs.value = [StorageLoadView, FileUploadView];
    } else {
        tabs.value = [LocalFileLoadView];
    }
});
function changeCurrentTab(target: LoaderTabType) {
    const idx = tabNames.value.findIndex((name) => name === target);
    currentTab.value = idx;
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/theme';
.container {
    border-radius: $BORDER-RADIUS__4;
    box-shadow: $SHADOW__6DP;
    height: 100%;
    width: 100%;
    .header {
        display: flex;
        flex-direction: row;
        padding: 0 1rem;
        height: 4rem;
        font: $HEADER__2;
        border-bottom: 2px solid $BORDER-COLOR;

        & > * {
            margin: auto 0;
        }
        img.icon.folder {
            margin-right: 1rem;
        }
        h2 {
            flex-grow: 1;
            text-align: start;
        }
    }
    menu {
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0 1rem;
        height: 2.5rem;
        border-bottom: 2px solid $BORDER-COLOR;

        button.item {
            padding: 0 8px;
        }
    }
}
</style>
