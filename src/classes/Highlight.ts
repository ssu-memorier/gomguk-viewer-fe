import Color from '@/classes/Color';
import getSelectedTokens from '@/utils/getSelectedTokens';

export interface IHighlight {
    pageNum: number | undefined;
    startLine: number | undefined;
    startToken: number | undefined;
    startOffset: number | undefined;
    endLine: number | undefined;
    endToken: number | undefined;
    endOffset: number | undefined;
    color: string | undefined;
}
export default class Highlight {
    pageNum: number | undefined;
    startLine: number | undefined;
    startToken: number | undefined;
    startOffset: number | undefined;
    endLine: number | undefined;
    endToken: number | undefined;
    endOffset: number | undefined;
    color: Color | undefined = Color.YELLOW;

    constructor(pageNum?: number, range?: Range) {
        if (!pageNum || !range) return;

        this.pageNum = pageNum;
        this.startLine = 0;
        this.endLine = 0;

        const tokens = getSelectedTokens(range);
        const startToken = tokens[0];
        const endToken = tokens[tokens.length - 1];

        if (startToken) {
            this.startLine = startToken.lineNum;
            this.startToken = startToken.tokenNum;
            this.startOffset = startToken.startOffset;
        }
        if (endToken) {
            this.endLine = endToken.lineNum;
            this.endToken = endToken.tokenNum;
            this.endOffset = endToken.endOffset;
        }
    }

    getRange() {
        const range = new Range();
        const startToken = document.querySelector(
            `.textLayer[data-page-index="${this.pageNum}"] span[data-line-num="${this.startLine}"][data-token-num="${this.startToken}"]`
        );
        const endToken = document.querySelector(
            `.textLayer[data-page-index="${this.pageNum}"] span[data-line-num="${this.endLine}"][data-token-num="${this.endToken}"]`
        );

        if (!startToken?.firstChild || !endToken?.firstChild) return;

        range.setStart(startToken.firstChild, this.startOffset || 0);
        range.setEnd(endToken.firstChild, this.endOffset || 0);

        return range;
    }

    toJSON() {
        return {
            pageNum: this.pageNum,
            startLine: this.startLine,
            startToken: this.startToken,
            startOffset: this.startOffset,
            endLine: this.endLine,
            endToken: this.endToken,
            endOffset: this.endOffset,
            color: this.color ? this.color.code : Color.YELLOW.code,
        };
    }
    static fromJSON(json: IHighlight) {
        const highlight = new Highlight();
        highlight.pageNum = json.pageNum;
        highlight.startLine = json.startLine;
        highlight.startToken = json.startToken;
        highlight.startOffset = json.startOffset;
        highlight.endLine = json.endLine;
        highlight.endToken = json.endToken;
        highlight.endOffset = json.endOffset;
        highlight.color = json.color ? Color.fromHex(json.color) : undefined;

        return highlight;
    }
}
