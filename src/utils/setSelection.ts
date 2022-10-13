import Line from '@/classes/Line';
import clearSelection from '@/utils/clearSelection';

export default function setSelection(selectedLines: Line[]) {
    const firstLine = selectedLines[0];
    const lastLine = selectedLines[selectedLines.length - 1];

    if (!firstLine || !lastLine) return;

    const range = new Range();
    const anchorToken = firstLine.firstToken;
    const anchorOffset = anchorToken?.startOffset;
    const focusToken = lastLine.lastToken;
    const focusOffset = focusToken?.endOffset;

    if (!anchorToken.$el || !focusToken.$el) return;

    range.setStart(anchorToken.$el.firstChild as Node, anchorOffset as number);
    range.setEnd(focusToken.$el.firstChild as Node, focusOffset as number);

    const selection = document.getSelection();

    if (!selection) return;

    clearSelection();
    selection.addRange(range);
}
