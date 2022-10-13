import Rect from '@/classes/Rect';
import Token from '@/classes/Token';

/**
 * Line 클래스는 selection된 줄 정보를 저장합니다.
 * selection 영역의 왼쪽 위 좌표와 오른쪽 아래 좌표를 저장하며 이 두 점의 정보로
 * 사각형 영역 정보를 나타냅니다.
 */
export default class Line {
    public lineNum;
    public rect: Rect = new Rect();
    protected tokens = [] as Token[];

    constructor(lineNum: number) {
        this.lineNum = lineNum;
    }
    addToken(token: Token) {
        this.tokens.push(token);

        this.rect.setStartPos({
            x: Math.min(this.rect.left, token.left),
            y: Math.min(this.rect.top, token.top),
        });
        this.rect.setEndPos({
            x: Math.max(this.rect.right, token.right),
            y: Math.max(this.rect.bottom, token.bottom),
        });
    }
    getText() {
        return this.tokens.reduce((acc, token) => {
            return acc + token.getText();
        }, '');
    }
}
