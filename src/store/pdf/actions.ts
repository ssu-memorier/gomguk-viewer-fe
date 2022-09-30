import * as pdfjsLib from 'pdfjs-dist';
import { PdfState } from '@/Interface/PdfState';
import getBase64 from '@/utils/getBase64';

/**
 * url을 통해 PDF 파일을 불러오는 함수입니다.
 * @param state pdf 상태
 * @param payload 파라미터
 * @returns action 함수는 특정 값을 return하지 않습니다.
 */
async function setPdfFromUrl(state: PdfState, payload: string) {
    if (!payload) {
        return;
    }
    const loadingTask = pdfjsLib.getDocument(payload);
    const pdfDoc = await loadingTask.promise;

    state.doc = pdfDoc;
    state.pageCache = new Map();
}
async function setPdfFromFile(state: PdfState, payload: File) {
    if (!payload) {
        return;
    }

    const base64 = await getBase64(payload);

    if (!base64) return;

    const loadingTask = pdfjsLib.getDocument(base64);
    const pdfDoc = await loadingTask.promise;
    state.pageCache = new Map();
    state.fileName = payload.name;
    state.doc = pdfDoc;
    return;
}
export default {
    setPdfFromUrl,
    setPdfFromFile,
};
