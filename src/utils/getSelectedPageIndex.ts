export default function getSelectedPageIndex(range: Range) {
    if (!range.commonAncestorContainer) return -1;

    let ancestorContainer = range.commonAncestorContainer as HTMLElement;
    if (ancestorContainer.nodeName === '#text') {
        const textContainer = ancestorContainer.parentElement as HTMLElement;
        ancestorContainer = textContainer.parentElement as HTMLElement;
    }

    const pageIndexData = ancestorContainer.dataset['pageIndex'];

    if (!pageIndexData) return -1;

    return parseInt(pageIndexData, 10);
}
