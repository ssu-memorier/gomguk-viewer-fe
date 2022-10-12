import TOKEN from '@/constants/TOKEN';
import getLeftGap from '@/utils/line/getLeftGap';
import getRightGap from '@/utils/line/getRightGap';
import { IOffset } from '@/Interface/IOffset';
export default class Token {
    $el;
    startOffset;
    endOffset;

    constructor($token: HTMLElement, offset?: IOffset) {
        this.$el = $token;

        if (offset) {
            this.startOffset = offset.start ?? 0;
            this.endOffset = offset.end ?? $token.textContent?.length;
        }
    }

    getText() {
        const start = this.startOffset;
        const end = this.endOffset;

        return this.$el.textContent?.slice(start, end);
    }

    get left() {
        const leftPosStr = this.$el.dataset[TOKEN.DATASET.LEFT];
        const leftPos = Number(leftPosStr);

        if (this.startOffset) {
            return leftPos + getLeftGap(this.$el, this.startOffset);
        }
        return leftPos;
    }
    get right() {
        const rightPosStr = this.$el.dataset[TOKEN.DATASET.RIGHT];
        const rightPos = Number(rightPosStr);

        if (this.endOffset) {
            return rightPos - getRightGap(this.$el, this.endOffset);
        }
        return rightPos;
    }
    get top() {
        const topPosStr = this.$el.dataset[TOKEN.DATASET.TOP];
        return Number(topPosStr);
    }
    get bottom() {
        const bottomPosStr = this.$el.dataset[TOKEN.DATASET.BOTTOM];
        return Number(bottomPosStr);
    }
    get lineNum() {
        const lineNumStr = this.$el.dataset[TOKEN.DATASET.LINE_NUM];
        return lineNumStr ? parseInt(lineNumStr, 10) : -1;
    }
    get tokenNum() {
        const tokenNumStr = this.$el.dataset[TOKEN.DATASET.TOKEN_NUM];
        return tokenNumStr ? parseInt(tokenNumStr, 10) : -1;
    }
}
