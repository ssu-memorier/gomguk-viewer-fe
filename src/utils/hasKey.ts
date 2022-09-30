/**
 * 타입스크립트에서 객체 내부에 특정 키가 존재하는지 확인하는 유틸 함수 입니다.
 * @param obj 객체
 * @param k 키
 * @returns 객체에 키가 포함되는지 여부(boolean)
 */

export default function hasKey<T extends object>(
    obj: T,
    k: keyof any
): k is keyof T {
    return k in obj;
}
