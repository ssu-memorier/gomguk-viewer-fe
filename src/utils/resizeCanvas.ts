import { SizeType } from '@/types/SizeType';

export default function resizeCanvas(
    canvas: HTMLCanvasElement | undefined,
    size: SizeType
) {
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;
}
