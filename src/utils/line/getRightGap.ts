/**
 * getRightGap은 오른쪽으로 떨어진 길이를 구합니다.
 * selection의 마지막 줄은 텍스트의 중간지점에서 끝날 수 있습니다.
 * 이 경우 오른쪽으로 얼만큼 떨어진 위치에서 selection이 끝났는지 구해야합니다.
 * 이런 경우 getRightGap을 사용합니다.
 *
 * ex) <span>abcde</span> <- selection이 c에서 끝나는 경우 de만큼의 길이를 제외하고 highlight를 생성해야합니다.
 *
 * @param startContainer selection에 포함된 첫번째 토큰
 * @param startOffset startContainer의 몇 번 인덱스에서 selection이 시작됐는지 알려줌
 * @returns 길이 정보
 */

export default function getRightGap은(endContainer: Node, endOffset: number) {
    const afterEndRange = new Range();
    const wholeText = (endContainer as Text).wholeText;

    afterEndRange.setStart(endContainer, endOffset);
    afterEndRange.setEnd(endContainer, wholeText.length);

    const { width } = afterEndRange.getBoundingClientRect();

    return width;
}
