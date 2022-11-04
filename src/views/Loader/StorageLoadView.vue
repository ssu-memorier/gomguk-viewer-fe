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
import { requestFileList, requestFile, requestDeleteFile } from '@/api/storage';
import { usePdfStore } from '@/store/pdf';
import { ref, onMounted } from 'vue';

interface IFileInfo {
    dir: string;
    key: string;
    lastModified: string;
    sze: number;
}
const pdfStore = usePdfStore();
const fileList = ref<IFileInfo[]>([]);
const $files = ref();
onMounted(async () => {
    fileList.value = await getFileList();
});

async function getFileList() {
    const response = await requestFileList({ id: 'test_id' });
    if (!response.isSuccess) {
        console.error(`request failed`);
        return;
    }

    return response.data;
}
async function loadFile(file: IFileInfo) {
    const response = await requestFile({
        dir: file.dir,
        key: file.key,
    });
    if (!response.isSuccess) return;

    const fileLoadEvent = new Event('loadfile', { bubbles: true });
    $files.value.dispatchEvent(fileLoadEvent);

    pdfStore.setPdfFile(response.data);
}

async function deleteFile(file: IFileInfo) {
    const response = await requestDeleteFile({ dir: file.dir, key: file.key });

    fileList.value = await getFileList();
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
