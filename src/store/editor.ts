import EditorJS, { OutputData } from '@editorjs/editorjs';

let editor: EditorJS | null = null;
export default {
    createEditor(holder = 'editorjs') {
        if (editor) return editor;

        return (editor = new EditorJS({
            holder: holder,
        }));
    },
    async getClearJson() {
        if (!editor) return null;
        return await editor.save();
    },
    async fromJson(json: OutputData) {
        if (!editor) return;

        editor.render(json);
    },
};
