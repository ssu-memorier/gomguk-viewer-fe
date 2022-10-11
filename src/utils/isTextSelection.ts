export default function isTextSelection(range: Range) {
    const { startContainer, endContainer } = range;
    return (
        startContainer.nodeName === '#text' && endContainer.nodeName === '#text'
    );
}
