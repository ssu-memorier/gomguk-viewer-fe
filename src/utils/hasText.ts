/**
 * hasText는 Selection한 영역이 텍스트 영역인지 알려줍니다.
 * selection 도중 마우스가 텍스트를 벗어나는 경우, 영역 정보가 undefined가 됩니다.
 * 이러한 현상은 blink 현상을 일으키는 주범이기 때문에 이를 방지하는데 hasText가 사용됩니다.
 * @param range selection한 영역 정보가 담긴 Range 객체
 * @returns selection한 영역이 잘못되지 않았는지 알려주는 boolean
 */
export default function hasText(range: Range) {
    const { startContainer, endContainer } = range;
    return (
        startContainer.nodeName === '#text' && endContainer.nodeName === '#text'
    );
}
