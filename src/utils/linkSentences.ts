import LINE from '@/constants/LINE';

/**
 * 여러 개의 문장을 하나의 문장으로 만듦니다.
 * 끝이 - 로 끝나는 경우 이를 제거합니다.
 * @returns -과 \n,\r이 제거된 (즉, 개행 없는) 문자열
 */
export default function linkSentences(sentences: string[]): string {
    return sentences.reduce((acc, sentence) => {
        if (sentence.endsWith(LINE.LINE_END_HYPHEN)) {
            return acc + sentence.slice(0, -1);
        }
        return acc + sentence + LINE.SPACE;
    });
}
