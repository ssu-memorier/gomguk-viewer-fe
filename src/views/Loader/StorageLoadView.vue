<template>
    <ul ref="$files">
        <li class="head">
            <span class="icon"></span>
            <span class="name">파일명</span>
            <span class="lastModified">마지막 수정일</span>
            <span class="size">크기</span>
        </li>
        <li
            class="item"
            v-for="file in fileList"
            :key="file.key"
            @dblclick="loadFile(file)"
        >
            <span class="icon">
                <img src="@/assets/images/svg/file.svg" />
            </span>
            <span class="name">{{ file.key }}</span>
            <span class="lastModified">{{
                date2format(new Date(file.lastModified))
            }}</span>
            <span class="size">{{ file.size }}</span>
        </li>
    </ul>
</template>
<script lang="ts">
export default {
    name: 'StorageLoad',
};
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFileStore } from '@/store/file';
import { IFileInfo } from '@/Interface/IFileInfo';
import { useUserStore } from '@/store/user';
import MESSAGE from '@/constants/MESSAGE';
// @click.stop="deleteFile(file)"
const fileStore = useFileStore();
const userStore = useUserStore();
const fileList = ref<IFileInfo[]>([
    {
        dir: 'test_id',
        key: 'test1.pdf',
        lastModified: '2022-11-01T14:56:29Z',
        size: 442404,
    },
    {
        dir: 'test_id',
        key: 'test2.pdf',
        lastModified: '2022-11-03T15:02:50Z',
        size: 442404,
    },
    {
        dir: 'test_id',
        key: 'test3.pdf',
        lastModified: '2022-11-23T10:02:50Z',
        size: 442404,
    },
]);
const $files = ref();
onMounted(async () => {
    if (userStore.isLoggined) {
        updateFileList();
    }
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

function date2format(date: Date) {
    const today = new Date();
    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    ) {
        const HH = `00${date.getHours()}`.slice(-2);
        const DD = `00${date.getMinutes()}`.slice(-2);
        return `${HH}:${DD}`;
    }

    const YYYY = `${date.getFullYear()}`;
    const MM = `00${date.getMonth() + 1}`.slice(-2);
    const DD = `00${date.getDate()}`.slice(-2);

    return `${YYYY}-${MM}-${DD}`;
}
</script>
<style lang="scss" scoped>
ul {
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        padding: 0 1rem;
        text-align: left;
        line-height: 1.6rem;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        &.head {
            cursor: default;
        }
        &.item:hover {
            background-color: lightgray;
        }
        .icon {
            width: 48px;
        }
        .name {
            flex-grow: 1;
        }
        .lastModified {
            width: 160px;
        }
        .size {
            width: 160px;
        }
    }
}
</style>
