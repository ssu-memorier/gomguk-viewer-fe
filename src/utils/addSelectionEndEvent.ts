import SELECTION from '@/constants/SELECTION';

document.addEventListener('mouseup', (evt) => {
    if (window.getSelection()?.toString() !== '') {
        evt.target?.dispatchEvent(
            new CustomEvent(SELECTION.SELECTION_END_EVENT, {
                detail: {
                    clientX: evt.clientX,
                    clientY: evt.clientY,
                },
                bubbles: true,
            })
        );
    }
});
