import { IPos } from '@/Interface/IPos';

export default class Rect {
    startPoint: IPos = {
        x: Infinity,
        y: Infinity,
    };
    endPoint: IPos = {
        x: 0,
        y: 0,
    };
    setStartPos(pos: IPos) {
        this.startPoint = pos;
    }
    setEndPos(pos: IPos) {
        this.endPoint = pos;
    }
    setLeft(x: number) {
        this.startPoint.x = x;
    }
    setRight(x: number) {
        this.endPoint.x = x;
    }
    setTop(y: number) {
        this.startPoint.y = y;
    }
    setBottom(y: number) {
        this.endPoint.y = y;
    }
    isOverlap(x: number, y: number): boolean {
        if (!(this.left <= x && x <= this.right)) {
            return false;
        }
        if (!(this.top <= y && y <= this.bottom)) {
            return false;
        }
        return true;
    }
    get height() {
        return Math.max(this.endPoint.y - this.startPoint.y, 0);
    }
    get width() {
        return Math.max(this.endPoint.x - this.startPoint.x, 0);
    }
    get top() {
        return this.startPoint.y;
    }
    get bottom() {
        return this.endPoint.y;
    }
    get left() {
        return this.startPoint.x;
    }
    get right() {
        return this.endPoint.x;
    }
}
