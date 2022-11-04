<template>
    <ul ref="$files">
        <li
            class="item"
            v-for="file in fileList"
            :key="file.Key"
            @dblclick="loadFile(file)"
        >
            {{ file.Key }}
        </li>
    </ul>
</template>
<script lang="ts">
export default {
    name: 'StorageLoad',
};
</script>
<script setup lang="ts">
import { requestFileList, requestFile } from '@/api/storage';
import { usePdfStore } from '@/store/pdf';
import { ref, onMounted } from 'vue';

interface IFileInfo {
    ETag: string;
    Key: string;
    LastModified: string;
    Size: number;
    StorageClass: string;
}
const pdfStore = usePdfStore();
const fileList = ref<IFileInfo[]>([]);
const $files = ref();
onMounted(async () => {
    const response = await requestFileList({ id: 'test_id' });
    if (!response.isSuccess) {
        console.error(`request failed`);
        return;
    }

    fileList.value = response.data;
});

async function loadFile(file: IFileInfo) {
    const response = await requestFile({ id: 'test_id', key: file.Key });

    if (!response.isSuccess) return;

    const fileLoadEvent = new Event('loadfile', { bubbles: true });
    $files.value.dispatchEvent(fileLoadEvent);

    pdfStore.setPdfFile(response.data);
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
