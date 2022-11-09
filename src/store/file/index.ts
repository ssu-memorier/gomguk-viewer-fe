import { defineStore } from 'pinia';
import { useEditorStore } from '@/store/file/editor';
import { usePdfStore } from '@/store/file/pdf';
import {
    requestFileUpload,
    requestFileList,
    requestDeleteFile,
    requestFile,
} from '@/api/storage';
import { IFileInfo } from '@/Interface/IFileInfo';
import MESSAGE from '@/constants/MESSAGE';
import { ref } from 'vue';

const editorStore = useEditorStore();
const pdfStore = usePdfStore();

export const useFileStore = defineStore('file', () => {
    const fileList = ref<IFileInfo[]>([]);

    async function fetchFileList() {
        const response = await requestFileList({ id: 'test_id' });
        if (!response.isSuccess) {
            alert(MESSAGE.STORAGE.GET_LIST_FAILED);

            return;
        }

        return response.data;
    }

    async function uploadFile(pdf: File) {
        const response = await requestFileUpload({
            dir: 'test_id',
            key: pdf.name,
            file: pdf,
        });

        if (!response.isSuccess) {
            alert(MESSAGE.STORAGE.UPLOAD_FAILED);

            return;
        }
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
        pdfStore.setPdfFile(response.data);
    }

    async function deleteFile(file: IFileInfo) {
        const response = await requestDeleteFile({
            dir: file.dir,
            key: file.key,
        });
        if (!response.isSuccess) {
            alert(MESSAGE.STORAGE.DELETE_FAILED);

            return;
        }
        fileList.value = await fetchFileList();
    }

    return {
        fetchFileList,
        uploadFile,
        loadFile,
    };
});