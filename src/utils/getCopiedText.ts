/**
 * selection 후 복사하면 개행을 제거한 문자열을 반환합니다.
 * @returns -과 \n,\r이 제거된 (즉, 개행 없는) 문자열
 */
export default function getCopiedText() {
    return (
        window
            .getSelection()
            ?.toString()
            .replace(/-[\n\r]+/g, '')
            .replace(/[\n\r]+/g, ' ') || ''
    );
}
