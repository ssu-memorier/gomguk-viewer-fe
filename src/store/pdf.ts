import { PDFDocumentProxy, getDocument } from 'pdfjs-dist';
import { defineStore } from 'pinia';
import { ref, reactive, watch, computed } from 'vue';
import getBase64 from '@/utils/getBase64';
import Page from '@/classes/Page';

export const usePdfStore = defineStore('pdf', () => {
    const pdfFile = ref<File>();
    const pageMap = new Map<number, Page>();
    const viewportOption = reactive({
        scale: 1.6,
    });
    const fileName = computed(() => {
        if (!pdfFile.value) return '';
        else return pdfFile.value.name;
    });
    const numPages = ref<number>(0);

    watch(pdfFile, async (newFile) => {
        pageMap.clear();
        if (!newFile) return;

        const doc = await getDoc(newFile);
        if (!doc) return;

        await initPages(doc);
        numPages.value = doc.numPages;
    });

    async function getPage(pageNum: number) {
        return pageMap.get(pageNum);
    }
    async function setPdfFile(file: File) {
        pdfFile.value = file;
    }
    async function initPages(doc: PDFDocumentProxy) {
        pageMap.clear();
        for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
            const pageProxy = await doc.getPage(pageNum);
            const page = new Page(pageProxy, viewportOption);
            pageMap.set(pageNum, page);
        }
    }
    async function getDoc(file: File) {
        const base64 = await getBase64(file);
        if (!base64) return;

        const loadingTask = getDocument(base64);
        const doc = await loadingTask.promise;

        return doc;
    }
    return {
        setPdfFile,
        getPage,
        pageMap,
        pdfFile,
        fileName,
        numPages,
    };
});
