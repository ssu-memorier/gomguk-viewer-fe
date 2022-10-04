/**
 * selection 한 문자열에 개행을 제거해 반환합니다.
 * @returns -과 \n,\r이 제거된 (즉, 개행 없는) 문자열
 */
export default function getSerializedText(text: string) {
    return text.replace(/-[\n\r]+/g, '').replace(/[\n\r]+/g, ' ') || '';
}
