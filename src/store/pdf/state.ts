import { PdfState } from '@/Interface/PdfState';

const state: PdfState = {
    doc: null,
    scale: 1.6,
    pageCache: new Map(),
    async getPage(pageNum: number) {
        if (!this.doc) return;

        const maxPageNum = this.doc.numPages;

        if (pageNum > maxPageNum || pageNum <= 0) return;

        if (!this.pageCache.has(pageNum)) {
            const page = await this.doc.getPage(pageNum);
            this.pageCache.set(pageNum, page);
        }
        return this.pageCache.get(pageNum);
    },
};

export default state;
