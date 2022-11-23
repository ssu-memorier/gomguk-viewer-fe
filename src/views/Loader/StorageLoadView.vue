<template>
    <ul ref="$files">
        <li class="head">
            <span class="icon"></span>
            <span class="name">{{ FILE.VIEW.NAME }}</span>
            <span class="lastModified">{{ FILE.VIEW.LAST_MODIFIED }}</span>
            <span class="size">{{ FILE.VIEW.SIZE }}</span>
            <span class="delete">{{ FILE.VIEW.DELETE }}</span>
        </li>
        <li
            class="item"
            v-for="file in fileList"
            :key="file.key"
            @dblclick="loadFile(file)"
        >
            <img class="icon" src="@/assets/images/svg/file.svg" />
            <span class="name">{{ file.key }}</span>
            <span class="lastModified">{{
                date2format(new Date(file.lastModified))
            }}</span>
            <span class="size">{{ size2format(file.size) }}</span>
            <span class="delete">
                <a @click.stop="deleteFile(file)">{{ FILE.VIEW.DELETE }}</a>
            </span>
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
import FILE from '@/constants/FILE';
import date2format from '@/utils/date2format';
import size2format from '@/utils/size2format';

const fileStore = useFileStore();
const userStore = useUserStore();
const fileList = ref<IFileInfo[]>([
    {
        dir: 'test_id',
        key: 'test1111111111111111111111111111111111111111.pdf',
        lastModified: '2022-11-01T14:56:29Z',
        size: 704,
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
        size: 1442404,
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
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/FILE_TABLE';

ul {
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        padding: $FILE-TABLE-VERTICAL-PADDING;
        text-align: left;
        line-height: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        .icon img,
        .name,
        .lastModified,
        .size,
        .delete {
            margin: auto 0;
        }
        &.head {
            cursor: default;
            height: $FILE-TABLE-HEAD-HEIGHT;
            border-bottom: $FILE-HEAD-BORDER-THICKNESS solid
                $BORDER-COLOR__LIGHT;
        }
        &.item:hover {
            background-color: lightgray;
        }

        .icon {
            aspect-ratio: 1 / 1;
            width: $FILE-ICON-SIZE;
            margin-right: $FILE-ICON-MARGIN-RIGHT;
            flex-shrink: 0;
        }
        .name {
            flex-grow: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: $FILE-NAME-MARGIN-RIGHT;
        }
        .lastModified {
            width: $FILE-LASTMODIFIED-WIDTH;
            flex-shrink: 0;
        }
        .size {
            width: $FILE-SIZE-WIDTH;
            flex-shrink: 0;
        }
        .delete {
            width: $FILE-DELETE-WIDTH;
            flex-shrink: 0;
            text-align: center;
            a {
                font: $SMALL_TEXT;
                color: $ALERT-COLOR;
            }
            a:hover {
                text-decoration: underline $ALERT-COLOR;
            }
        }
    }
    li.item {
        height: $FILE-HEIGHT;
    }
}
</style>
