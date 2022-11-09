import { defineStore } from 'pinia';
import { useEditorStore } from '@/store/file/editor';
import { useHighlightStore } from '@/store/file/highlight';
import { usePdfStore } from '@/store/file/pdf';
import { requestFileUpload } from '@/api/storage';
import MESSAGE from '@/constants/MESSAGE';
import { ref } from 'vue';

const editorStore = useEditorStore();
const HighlightStore = useHighlightStore();
const pdfStore = usePdfStore();

export const useFileStore = defineStore('file', () => {
    function fetchFileList() {
        //TODO: 파일 리스트 불러오기 로직
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
        uploadFile,
    };
});
