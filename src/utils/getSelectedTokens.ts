import Token from '@/classes/Token';

/**
 * getSelectedTokens는 Range에 포함된 토큰들을 골라냅니다.
 * span 태그만 토큰으로 포함합니다.
 * @param range
 * @returns Token[]
 */
export default function getSelectedTokens(range: Range): Token[] {
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const selectedNodes = [...range.cloneContents().childNodes];
    const commonAncestorContainer = range.commonAncestorContainer;

    if (
        commonAncestorContainer.nodeName === '#text' &&
        commonAncestorContainer.parentElement
    ) {
        return [
            new Token(commonAncestorContainer.parentElement, {
                start: startOffset,
                end: endOffset,
            }),
        ];
    }
    return selectedNodes
        .filter((node) => node.nodeName === 'SPAN')
        .map((node, idx, arr) => {
            if (idx === 0) {
                return new Token(startContainer.parentElement as HTMLElement, {
                    start: startOffset,
                });
            }
            if (idx === arr.length - 1) {
                return new Token(endContainer.parentElement as HTMLElement, {
                    end: endOffset,
                });
            }
            return new Token(node as HTMLElement);
        });
}
