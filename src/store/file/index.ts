import { defineStore } from 'pinia';
import { useEditorStore } from '@/store/file/editor';
import { usePdfStore } from '@/store/file/pdf';
import {
    requestUploadFile,
    requestFileList,
    requestDeleteFile,
    requestFile,
    requestUpdateFile,
} from '@/api/storage';
import { IFileInfo } from '@/Interface/IFileInfo';
import { ref } from 'vue';

export const useFileStore = defineStore('file', () => {
    const editorStore = useEditorStore();
    const pdfStore = usePdfStore();
    const currentFileInfo = ref<IFileInfo | undefined>();

    async function fetchFileList(): Promise<IFileInfo[] | undefined> {
        const response = await requestFileList();
        if (!response.isSuccess) {
            return;
        }

        return response.data;
    }

    async function uploadFile(pdf: File): Promise<boolean> {
        const response = await requestUploadFile({
            dir: 'test_id',
            key: pdf.name,
            file: pdf,
        });

        if (!response.isSuccess) {
            return false;
        }
        return true;
    }

    async function updateFile(): Promise<boolean> {
        if (!currentFileInfo.value) return false;

        const response = await requestUpdateFile({
            dir: currentFileInfo.value.dir,
            key: currentFileInfo.value.key,
            data: {
                editor: editorStore.toJSON(),
                highlights: [],
            },
        });

        if (!response.isSuccess) {
            return false;
        }
        return true;
    }

    async function loadFile(fileInfo: IFileInfo): Promise<boolean> {
        const response = await requestFile({
            dir: fileInfo.dir,
            key: fileInfo.key,
        });
        if (!response.isSuccess) return false;

        currentFileInfo.value = fileInfo;
        pdfStore.setPdfFile(response.data);

        return true;
    }

    async function deleteFile(fileInfo: IFileInfo) {
        const response = await requestDeleteFile({
            dir: fileInfo.dir,
            key: fileInfo.key,
        });
        return response.isSuccess;
    }

    return {
        fetchFileList,
        uploadFile,
        loadFile,
        deleteFile,
        updateFile,
    };
});
