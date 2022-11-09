import { defineStore } from 'pinia';
import { useEditorStore } from '@/store/file/editor';
import { useHighlightStore } from '@/store/file/highlight';
import { usePdfStore } from '@/store/file/pdf';
import { requestFileUpload, requestFileList } from '@/api/storage';
import MESSAGE from '@/constants/MESSAGE';
import { ref } from 'vue';

const editorStore = useEditorStore();
const HighlightStore = useHighlightStore();
const pdfStore = usePdfStore();

export const useFileStore = defineStore('file', () => {
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

    function fetchFile() {
        //TODO: 파일 불러오기 로직
    }

    function deleteFile() {
        //TODO: 파일 삭제 로직
    }

    return {
        fetchFileList,
        uploadFile,
    };
});
