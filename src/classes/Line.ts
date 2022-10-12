import TOKEN from '@/constants/TOKEN';
import { IPos } from '@/Interface/IPos';

/**
 * Line 클래스는 selection된 줄 정보를 저장합니다.
 * selection 영역의 왼쪽 위 좌표와 오른쪽 아래 좌표를 저장하며 이 두 점의 정보로
 * 사각형 영역 정보를 나타냅니다.
 */
export default class Line {
    lineNum;
    startPoint: IPos = {
        x: Infinity,
        y: Infinity,
    };
    endPoint: IPos = {
        x: 0,
        y: 0,
    };
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

        this.startPoint = {
            x: Math.min(this.startPoint.x, tokenLeft),
            y: Math.min(this.startPoint.y, tokenTop),
        };
        this.endPoint = {
            x: Math.max(this.endPoint.x, tokenRight),
            y: Math.max(this.endPoint.y, tokenBottom),
        };
    }
    setStartPos(pos: IPos) {
        this.startPoint = pos;
    }
    setEndPos(pos: IPos) {
        this.endPoint = pos;
    }
    get lineHeight() {
        return Math.max(this.endPoint.y - this.startPoint.y, 0);
    }
    get lineWidth() {
        return Math.max(this.endPoint.x - this.startPoint.x, 0);
    }
}
