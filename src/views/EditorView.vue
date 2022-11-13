<template>
    <section class="editorView view">
        <div id="editorjs"></div>
    </section>
</template>
<script setup lang="ts">
import { useEditorStore } from '@/store/file/editor';
import { onMounted } from 'vue';

onMounted(() => {
    const editorStore = useEditorStore();
    const editorJs = editorStore.renderEditor('editorjs');
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';
.editorView {
    background-color: $SURFACE-COLOR;
    text-align: left;

    #editorjs {
        max-width: calc(650px + 8rem);
        padding: 1rem 4rem 1rem 4rem;
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        font-family: 'Nanum Gothic', 'Roboto', sans-serif;
        transition: 0.3s;
    }
}
</style>
