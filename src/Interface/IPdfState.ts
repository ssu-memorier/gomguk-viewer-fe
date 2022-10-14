import { PDFPageProxy, PDFDocumentProxy } from 'pdfjs-dist';
import Page from '@/classes/Page';
/**
 * PdfState 인터페이스입니다. PdfState라는 객체는 이렇게 구성되었다. 정도로 보면 됩니다.
 */
export interface IPdfState {
    fileName: string;
    doc: PDFDocumentProxy | null;
    scale: number;
    pageCache: Map<number, Page>;
    getPage(pageNum: number): Promise<Page | undefined>;
}
