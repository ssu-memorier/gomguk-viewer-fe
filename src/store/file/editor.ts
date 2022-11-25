import EditorJS, { OutputData } from '@editorjs/editorjs';
import { defineStore } from 'pinia';
import EDITOR from '@/constants/EDITOR';
import { DEFAULT_BLOCKS } from '@/constants/EDITOR/DEFAULT';
import { nextTick } from 'vue';
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

        const content = await editor.save();
        if (content.blocks.length === 0) {
            content.blocks.push(...DEFAULT_BLOCKS);
        }
        return content;
    }
    async function fromJSON(json: OutputData) {
        await nextTick();

        if (!editor) return;
        await editor.isReady;

        editor.render(json);
    }
    return {
        renderEditor,
        toJSON,
        fromJSON,
    };
});
