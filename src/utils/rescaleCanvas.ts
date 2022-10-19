import { SizeType } from '@/types/SizeType';

/**
 * 캔버스의 스케일을 변경한다.
 * @param $canvas scale을 변결할 캔버스
 * @param newSize 새 크기
 * @param oldSize 이전 크기
 */
export default function rescaleCanvas(
    $canvas: HTMLCanvasElement | undefined,
    newSize: SizeType,
    oldSize: SizeType
) {
    if (!$canvas) return;

    const ctx = $canvas.getContext('2d');
    ctx?.scale(newSize.width / oldSize.width, newSize.height / oldSize.height);
}
