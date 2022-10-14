import { IPdfState } from '@/Interface/IPdfState';
import Page from '@/classes/Page';

const state: IPdfState = {
    fileName: '',
    doc: null,
    viewportOption: {
        scale: 1.6,
    },
    pageCache: new Map<number, Page>(),
    async getPage(pageNum: number) {
        if (!this.doc) return;

        const maxPageNum = this.doc.numPages;

        if (pageNum > maxPageNum || pageNum <= 0) return;

        if (!this.pageCache.has(pageNum)) {
            const pageProxy = await this.doc.getPage(pageNum);
            const page = new Page(pageProxy, this.viewportOption);
            this.pageCache.set(pageNum, page);
        }
        return this.pageCache.get(pageNum);
    },
};

export default state;
