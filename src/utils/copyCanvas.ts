/**
 * 캔버스 요소를 복사해 반환합니다.
 * @param canvas 복사할 canvas 요소
 * @returns {HTMLCanvasElement | undefined}
 */
export default function copyCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const { width, height } = ctx.canvas;
    const originImg = ctx.getImageData(0, 0, width, height);
    const copiedCanvas = document.createElement('canvas');

    copiedCanvas.width = width;
    copiedCanvas.height = height;
    copiedCanvas.getContext('2d')?.putImageData(originImg, 0, 0);

    return copiedCanvas;
}
