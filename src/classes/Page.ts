import { ref } from 'vue';
import { IViewportOption } from '@/Interface/IViewportOption';
import * as pdfjs from 'pdfjs-dist';
import TOKEN from '@/constants/TOKEN';
import { SizeType } from '@/types/SizeType';
export default class Page {
    #pageProxy: pdfjs.PDFPageProxy;
    viewport = ref<pdfjs.PageViewport>();

    constructor(pageProxy: pdfjs.PDFPageProxy, option: IViewportOption) {
        this.#pageProxy = pageProxy;
        this.viewport = ref<pdfjs.PageViewport>(
            this.#pageProxy.getViewport(option)
        );
    }

    /**
     * pdf layer를 캔버스에 랜더링 합니다.
     * @param $layer pdf를 그릴 요소
     */
    async renderPdfLayer($layer: HTMLCanvasElement) {
        const ctx = $layer.getContext('2d');
        if (!ctx) return;
        if (!this.viewport.value) return;

        const renderContext = {
            canvasContext: ctx,
            viewport: this.viewport.value,
        };

        await this.#pageProxy.render(renderContext).promise;
    }

    /**
     * text layer를 랜더링하여 텍스트를 선택할 수 있게 합니다.
     * @param $layer 텍스트 요소(span,br)가 들어갈 컨테이너
     */
    async renderTextLayer($layer: HTMLDivElement) {
        $layer.innerHTML = '';
        if (!this.viewport.value) return;

        pdfjs.renderTextLayer({
            textContent: await this.#pageProxy.getTextContent(),
            container: $layer,
            viewport: this.viewport.value,
        });
    }
    /**
     * addTokenInfo는 textLayer에 line과 위치 정보를 추가합니다.
     * @param nodes
     * @returns
     */
    addTokenInfo($layer: HTMLDivElement) {
        const nodes = [...$layer.childNodes];
        const layerRect = $layer.getBoundingClientRect();

        let lineNum = 1;
        let tokenNum = 1;

        nodes.forEach((node) => {
            const $node = node as HTMLElement;
            if ($node.nodeName === 'BR') {
                lineNum++;
                tokenNum = 1;
            } else {
                const nodeRect = $node.getBoundingClientRect();

                $node.dataset[TOKEN.DATASET.TOKEN_NUM] = `${tokenNum}`;
                $node.dataset[TOKEN.DATASET.LINE_NUM] = `${lineNum}`;
                $node.dataset[TOKEN.DATASET.RIGHT] = `${
                    nodeRect.right - layerRect.left
                }`;
                $node.dataset[TOKEN.DATASET.BOTTOM] = `${
                    nodeRect.bottom - layerRect.top
                }`;
                $node.dataset[TOKEN.DATASET.LEFT] = `${
                    nodeRect.left - layerRect.left
                }`;
                $node.dataset[TOKEN.DATASET.TOP] = `${
                    nodeRect.top - layerRect.top
                }`;

                tokenNum++;
            }
        });
    }
    updateViewport(option: IViewportOption) {
        this.viewport.value = this.#pageProxy.getViewport(option);
    }
    get pageNum() {
        return this.#pageProxy.pageNumber;
    }
    get size(): SizeType {
        return {
            width: this.viewport.value?.width || 0,
            height: this.viewport.value?.height || 0,
        };
    }
}
