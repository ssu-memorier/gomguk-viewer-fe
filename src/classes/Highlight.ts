import Line from '@/classes/Line';
import Color from '@/classes/Color';

export default class Highlight {
    pageNum: number;
    lines: Line[];
    color: Color = Color.YELLOW;

    constructor(pageNum: number, lines: Line[]) {
        this.pageNum = pageNum;
        this.lines = lines;
    }
}
