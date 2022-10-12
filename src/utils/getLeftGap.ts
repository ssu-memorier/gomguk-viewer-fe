/**
 * getLeftGap은 왼쪽으로 떨어진 길이를 구합니다.
 * selection의 첫 줄은 텍스트의 중간지점에서 시작할 수 있습니다.
 * 이 경우 왼쪽으로 얼만큼 떨어진 위치에서 selection이 시작되었는지 구해야합니다.
 * 이런 경우 getLeftGap을 사용합니다.
 *
 * ex) <span>abcde</span> <- selection을 c에서 시작하는 경우 ab만큼 떨어진 곳에서 highlight를 생성해야합니다.
 *
 * @param startContainer selection에 포함된 첫번째 토큰
 * @param startOffset startContainer의 몇 번 인덱스에서 selection이 시작됐는지 알려줌
 * @returns 길이 정보
 */
export default function getLeftGap(startContainer: Node, startOffset: number) {
    const startNode = startContainer.firstChild;

    if (!startNode) return 0;

    const beforeStartRange = new Range();
    beforeStartRange.setStart(startNode, 0);
    beforeStartRange.setEnd(startNode, startOffset);
    const { width } = beforeStartRange.getBoundingClientRect();

    return width;
}
