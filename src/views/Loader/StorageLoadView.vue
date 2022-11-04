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
import MESSAGE from '@/constants/MESSAGE';
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

/**
 * TODO: id 제거하기
 *
 * 현재는 로그인 기능이 구현되어 있지 않아 유저를 식별할 수 없기 때문에
 * test_id 라는 값을 입력하고 있습니다.
 *
 * 추후 로그인 기능이 구현되면서 id 입력을 제거하도록하고
 * 세션을 통해 유저를 식별해 유저에 맞는 file list를 불러오도록 수정할
 * 예정입니다.
 *
 */
async function getFileList() {
    const response = await requestFileList({ id: 'test_id' });
    if (!response.isSuccess) {
        alert(MESSAGE.STORAGE.GET_LIST_FAILED);

        return;
    }

    return response.data;
}
async function loadFile(file: IFileInfo) {
    const response = await requestFile({
        dir: file.dir,
        key: file.key,
    });
    if (!response.isSuccess) {
        alert(MESSAGE.STORAGE.LOAD_FAILED);

        return;
    }

    const fileLoadEvent = new Event('loadfile', { bubbles: true });
    $files.value.dispatchEvent(fileLoadEvent);

    pdfStore.setPdfFile(response.data);
}

async function deleteFile(file: IFileInfo) {
    const response = await requestDeleteFile({ dir: file.dir, key: file.key });
    if (!response.isSuccess) {
        alert(MESSAGE.STORAGE.DELETE_FAILED);

        return;
    }
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
