export default function isTextSelected(range: Range) {
    const { startContainer, endContainer } = range;
    return (
        startContainer.nodeName === '#text' && endContainer.nodeName === '#text'
    );
}
