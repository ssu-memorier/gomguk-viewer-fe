import TOKEN from '@/constants/TOKEN';
import { IPos } from '@/Interface/IPos';
export default class Line {
    lineNum;
    right = 0;
    bottom = 0;
    left = Infinity;
    top = Infinity;
    #tokens = [] as HTMLElement[];
    constructor(lineNum: number) {
        this.lineNum = lineNum;
    }
    addToken($token: HTMLElement) {
        this.#tokens.push($token);

        const tokenLeft = Number($token.dataset[TOKEN.DATASET.LEFT] as string);
        const tokenTop = Number($token.dataset[TOKEN.DATASET.TOP] as string);
        const tokenRight = Number(
            $token.dataset[TOKEN.DATASET.RIGHT] as string
        );
        const tokenBottom = Number(
            $token.dataset[TOKEN.DATASET.BOTTOM] as string
        );

        this.left = Math.min(this.left, tokenLeft);
        this.top = Math.min(this.top, tokenTop);
        this.right = Math.max(this.right, tokenRight);
        this.bottom = Math.max(this.left, tokenBottom);
    }
    setStartPos(pos: IPos) {
        this.left = pos.x;
        this.top = pos.y;
    }
    setEndPos(pos: IPos) {
        this.right = pos.x;
        this.bottom = pos.y;
    }
    get lineHeight() {
        return Math.max(this.bottom - this.top, 0);
    }
    get lineWidth() {
        return Math.max(this.right - this.left, 0);
    }
}
