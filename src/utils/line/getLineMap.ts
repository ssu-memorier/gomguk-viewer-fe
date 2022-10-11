import TOKEN from '@/constants/TOKEN';
import Line from '@/classes/Line';

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
