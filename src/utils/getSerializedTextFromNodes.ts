/**
 * selection 한 노드들에 개행을 제거해 반환합니다.
 * @returns -과 \n,\r이 제거된 (즉, 개행 없는) 문자열
 */
export default function getSerializedTextFromNodes(nodes: ChildNode[]) {
    const withoutLineFeedString = nodes.reduce((acc, node) => {
        if (node.nodeName === 'BR') {
            return acc + ' ';
        }

        const str = node.textContent;

        return acc + str;
    }, '');

    const withoutBarString = withoutLineFeedString.replace(/- /g, '');

    return withoutBarString;
}
