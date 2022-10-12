/**
 * selection 영역을 지웁니다.
 */

export default function clearSelection() {
    const selection = window.getSelection();

    if (!selection) return;
    if (selection.empty) {
        selection.empty();
        return;
    }
    if (selection.removeAllRanges) {
        selection.removeAllRanges();
        return;
    }
}
