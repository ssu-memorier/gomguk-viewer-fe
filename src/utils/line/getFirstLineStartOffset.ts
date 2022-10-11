export default function getFirstLineStartOffset(
    startContainer: Node,
    startOffset: number
) {
    const beforeStartRange = new Range();
    beforeStartRange.setStart(startContainer, 0);
    beforeStartRange.setEnd(startContainer, startOffset);
    const { width } = beforeStartRange.getBoundingClientRect();

    return width;
}
