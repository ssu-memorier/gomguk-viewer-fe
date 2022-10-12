export default function getLastLineEndGap(
    endContainer: Node,
    endOffset: number
) {
    const afterEndRange = new Range();
    const wholeText = (endContainer as Text).wholeText;

    afterEndRange.setStart(endContainer, endOffset);
    afterEndRange.setEnd(endContainer, wholeText.length);

    const { width } = afterEndRange.getBoundingClientRect();

    return width;
}
