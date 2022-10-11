export default function getSelectedTokens(range: Range): HTMLElement[] {
    const selectedNodes = [...range.cloneContents().childNodes];
    const commonAncestorContainer = range.commonAncestorContainer;

    if (
        commonAncestorContainer.nodeName === '#text' &&
        commonAncestorContainer.parentElement
    ) {
        return [commonAncestorContainer.parentElement];
    }

    return selectedNodes
        .filter((node) => node.nodeName === 'SPAN')
        .map((node) => node as HTMLElement);
}
