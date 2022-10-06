/**
 * selection 한 노드들에 개행을 제거해 반환합니다.
 * @returns -과 \n,\r이 제거된 (즉, 개행 없는) 문자열
 */
export default function getSerializedTextFromNodes(nodes: ChildNode[]) {
    return nodes.reduce((acc, node) => {
        if (node.nodeName === 'BR') {
            return acc + ' ';
        }

        const str = node.textContent;

        if (!str) {
            return acc;
        }
        if (str[str.length - 1] === '-') {
            return acc + str.slice(0, -1);
        }
        return acc + str;
    }, '');
}
