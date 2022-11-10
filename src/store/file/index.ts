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
            dir: '',
            key: pdf.name.replace(/\.[^/.]+$/, ''),
            file: pdf,
        });

        if (!response.isSuccess) {
            return false;
        }
        return true;
    }

    async function updateFile(): Promise<boolean> {
        if (!currentFileInfo.value) return false;

        const cleanJSON = await editorStore.toJSON();
        if (!cleanJSON) return false;

        const response = await requestUpdateFile({
            dir: currentFileInfo.value.dir,
            key: currentFileInfo.value.key,
            data: {
                editor: cleanJSON,
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
        pdfStore.setPdfFile(response.data.pdf);
        editorStore.fromJSON(response.data.metaData.editor);

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
