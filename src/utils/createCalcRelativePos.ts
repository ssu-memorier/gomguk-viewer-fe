import { IPosition } from '@/Interface/IPosition';

export default function createCalcRelativePos(baseX: number, baseY: number) {
    return function calcRelativePos(absX: number, absY: number): IPosition {
        return { x: absX - baseX, y: absY - baseY };
    };
}
