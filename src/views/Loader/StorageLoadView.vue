<template>
    <ul ref="$files">
        <li
            class="item"
            v-for="file in fileList"
            :key="file.key"
            @dblclick="loadFile(file)"
        >
            {{ file.key }}
            <button @click.stop="deleteFile(file)">x</button>
        </li>
    </ul>
</template>
<script lang="ts">
export default {
    name: 'StorageLoad',
};
</script>
<script setup lang="ts">
import { useFileStore } from '@/store/file';
import { ref, onMounted } from 'vue';
import { IFileInfo } from '@/Interface/IFileInfo';
import MESSAGE from '@/constants/MESSAGE';

const fileStore = useFileStore();
const fileList = ref<IFileInfo[]>([]);
const $files = ref();

onMounted(async () => {
    updateFileList();
});

async function loadFile(fileInfo: IFileInfo) {
    const isSuccess = await fileStore.loadFile(fileInfo);
    if (!isSuccess) {
        alert(MESSAGE.STORAGE.LOAD_FAILED);

        return;
    }

    notifyFileLoad();
}

async function deleteFile(fileInfo: IFileInfo) {
    const isSuccess = await fileStore.deleteFile(fileInfo);
    if (!isSuccess) {
        alert(MESSAGE.STORAGE.DELETE_FAILED);

        return;
    }
    updateFileList();
}

async function updateFileList() {
    const list = await fileStore.fetchFileList();
    if (!list) {
        alert(MESSAGE.STORAGE.GET_LIST_FAILED);
        return;
    }

    fileList.value = list;
}

function notifyFileLoad() {
    const fileLoadEvent = new Event('loadfile', { bubbles: true });
    $files.value.dispatchEvent(fileLoadEvent);
}
</script>
<style lang="scss" scoped>
ul {
    list-style: none;
    padding: 0;
    li.item {
        text-align: left;
        line-height: 1.6rem;
        user-select: none;
        cursor: pointer;
        &:hover {
            background-color: lightgray;
        }
    }
}
</style>
