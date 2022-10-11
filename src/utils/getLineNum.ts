import TOKEN from '@/constants/TOKEN';

export default function getLineNum($token: HTMLElement): number {
    const lineNumData = $token.dataset[TOKEN.DATASET.LINE_NUM];

    if (!lineNumData) return -1;
    return parseInt(lineNumData, 10);
}
