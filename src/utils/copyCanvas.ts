export default function copyCanvas(ctx: CanvasRenderingContext2D) {
    const { width, height } = ctx.canvas;
    const originImg = ctx.getImageData(0, 0, width, height);
    const copiedCanvas = document.createElement('canvas');

    copiedCanvas.width = width;
    copiedCanvas.height = height;
    copiedCanvas.getContext('2d')?.putImageData(originImg, 0, 0);

    return copiedCanvas;
}
