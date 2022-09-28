import * as pdfjsLib from 'pdfjs-dist';

/**
 * PdfState 인터페이스입니다. PdfState라는 객체는 이렇게 구성되었다. 정도로 보면 됩니다.
 */
export interface PdfState {
    doc: pdfjsLib.PDFDocumentProxy | null;
    scale: number;
    pageCache: Map<number, pdfjsLib.PDFPageProxy>;
    getPage(pageNum: number): Promise<pdfjsLib.PDFPageProxy | undefined>;
}
