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

export const useFileStore = defineStore('file', () => {
    const editorStore = useEditorStore();
    const pdfStore = usePdfStore();

    async function fetchFileList(): Promise<IFileInfo[] | undefined> {
        const response = await requestFileList({ id: 'test_id' });
        if (!response.isSuccess) {
            return;
        }

        return response.data;
    }

    async function uploadFile(pdf: File): Promise<boolean> {
        const response = await requestFileUpload({
            dir: 'test_id',
            key: pdf.name,
            file: pdf,
        });

        if (!response.isSuccess) {
            return false;
        }
        return true;
    }

    async function loadFile(file: IFileInfo): Promise<File | undefined> {
        const response = await requestFile({
            dir: file.dir,
            key: file.key,
        });
        if (!response.isSuccess) {
            return;
        }
        return response.data as File;
    }

    async function deleteFile(file: IFileInfo) {
        const response = await requestDeleteFile({
            dir: file.dir,
            key: file.key,
        });
        return response.isSuccess;
    }

    return {
        fetchFileList,
        uploadFile,
        loadFile,
        deleteFile,
    };
});
