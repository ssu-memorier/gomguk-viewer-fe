import { defineStore } from 'pinia';
import { useEditorStore } from '@/store/file/editor';
import { usePdfStore } from '@/store/file/pdf';
import { useHighlightStore } from '@/store/file/highlight';
import {
    requestUploadFile,
    requestFileList,
    requestDeleteFile,
    requestFile,
    requestUpdateFile,
} from '@/api/storage';
import { IFileInfo } from '@/Interface/IFileInfo';
import { ref } from 'vue';
import { useAlertStore } from '@/store/alert';
import FILE from '@/constants/FILE';

export const useFileStore = defineStore('file', () => {
    const editorStore = useEditorStore();
    const highlightStore = useHighlightStore();
    const pdfStore = usePdfStore();
    const alertStore = useAlertStore();
    const isLoading = ref<boolean>(false);

    const currentFileInfo = ref<IFileInfo | undefined>();

    async function fetchFileList(): Promise<IFileInfo[] | undefined> {
        isLoading.value = true;
        const response = await requestFileList();
        isLoading.value = false;
        if (!response.isSuccess) {
            alertStore.pushAlert({
                time: new Date(),
                message: response.message,
            });
            return;
        }

        return response.payload;
    }

    async function uploadFile(pdf: File): Promise<boolean> {
        const response = await requestUploadFile({
            dir: '',
            key: pdf.name.replace(/\.[^/.]+$/, ''),
            file: pdf,
        });

        alertStore.pushAlert({
            time: new Date(),
            message: response.message,
        });

        return response.isSuccess;
    }

    async function updateFile(): Promise<boolean> {
        if (!currentFileInfo.value) return false;

        const cleanJSON = await editorStore.toJSON();
        if (!cleanJSON) return false;

        const highlightList = highlightStore.toJSON();

        const response = await requestUpdateFile({
            dir: currentFileInfo.value.dir,
            key: currentFileInfo.value.key,
            data: {
                editor: cleanJSON,
                highlights: highlightList,
            },
        });

        alertStore.pushAlert({
            time: new Date(),
            message: response.message,
        });

        return response.isSuccess;
    }

    async function loadFile(fileInfo: IFileInfo): Promise<boolean> {
        const response = await requestFile({
            dir: fileInfo.dir,
            key: fileInfo.key,
        });
        if (!response.isSuccess) {
            alertStore.pushAlert({
                time: new Date(),
                message: response.message,
            });
            return false;
        }

        currentFileInfo.value = fileInfo;
        pdfStore.setPdfFile(response.payload.pdf);
        editorStore.fromJSON(response.payload.metaData.editor);
        highlightStore.fromArray(response.payload.metaData.highlights);

        return true;
    }

    async function deleteFile(fileInfo: IFileInfo) {
        const response = await requestDeleteFile({
            dir: fileInfo.dir,
            key: fileInfo.key,
        });

        if (!response.isSuccess) {
            alertStore.pushAlert({
                time: new Date(),
                message: response.message,
            });
        }
        return response.isSuccess;
    }

    return {
        fetchFileList,
        uploadFile,
        loadFile,
        deleteFile,
        updateFile,
        isLoading,
    };
});
