import getSelectedTokens from '@/utils/getSelectedTokens';
import Line from '@/classes/Line';

/**
 * getSelectedLines에선 range로부터 selection에 포함된 토큰들을 줄별로 모아
 * Line 객체의 배열을 만들어 반환합니다.
 *
 * @param range Selection에 포함된 노드 정보를 가진 Range객체
 * @returns Line 배열
 */
export default function getSelectedLines(range: Range): Line[] {
    if (range.collapsed) return [];

    const selectedTokens = getSelectedTokens(range);
    const lineMap = selectedTokens.reduce((map, token) => {
        const lineNum = token.lineNum;

        if (!map.has(lineNum)) {
            map.set(lineNum, new Line(lineNum));
        }
        map.get(lineNum)?.addToken(token);

        return map;
    }, new Map<number, Line>());

    return [...lineMap.values()];
}
