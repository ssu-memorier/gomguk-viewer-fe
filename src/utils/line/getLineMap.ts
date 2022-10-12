import TOKEN from '@/constants/TOKEN';
import Line from '@/classes/Line';

/**
 * 몇번 줄이 selection에 포함되는지 저장하는 Map을 반환합니다.
 * Map<줄 번호, Line 객체>
 * @param tokens selection에 포함된 토큰 리스트
 * @returns 각 줄에 해당하는 Line이 포함된 Map
 */
export default function getLineMap(tokens: HTMLElement[]) {
    return tokens.reduce((map, $token) => {
        const tokenInfo = $token.dataset;
        const lineNum = parseInt(
            tokenInfo[TOKEN.DATASET.LINE_NUM] as string,
            10
        );

        if (!map.has(lineNum)) {
            map.set(lineNum, new Line(lineNum));
        }
        map.get(lineNum)?.addToken($token);

        return map;
    }, new Map<number, Line>());
}
