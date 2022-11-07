import EditorJS, { OutputData } from '@editorjs/editorjs';
import { defineStore } from 'pinia';
import EDITOR from '@/constants/EDITOR';

export const useEditorStore = defineStore('editor', () => {
    let editor: EditorJS | null = null;

    function renderEditor(holder = 'editorjs') {
        if (editor) return editor;

        return (editor = new EditorJS({
            holder: holder,
            tools: EDITOR.TOOL_CONFIG,
        }));
    }
    async function toJSON() {
        if (!editor) return null;
        return await editor.save();
    }
    async function fromJSON(json: OutputData) {
        if (!editor) return;

        editor.render(json);
    }
    return {
        renderEditor,
        toJSON,
        fromJSON,
    };
});
