<template>
    <div class="editorView">
        <div id="editorjs"></div>
    </div>
</template>
<script setup lang="ts">
import editor from '@/store/editor';

const editorJs = editor.createEditor('editorjs');
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';
.editorView {
    width: 100%;
    height: 100%;
    background-color: $SURFACE-COLOR;
    padding: 1rem 1rem 1rem 5rem;
    text-align: left;

    #editorjs {
        max-width: calc(650px + 8rem);
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        font-family: 'Nanum Gothic', 'Roboto', sans-serif;
        transition: 0.3s;
    }
}
</style>
