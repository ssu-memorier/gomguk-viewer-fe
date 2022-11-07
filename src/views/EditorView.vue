<template>
    <div id="editorjs"></div>
</template>
<script setup lang="ts">
import editor from '@/store/editor';

const editorJs = editor.createEditor('editorjs');
</script>
<style scoped>
#editorjs {
    max-width: calc(650px + 8rem);
    width: 100%;
    max-height: 800px;
    overflow: auto;
    position: relative;
    font-family: 'Nanum Gothic', 'Roboto', sans-serif;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 8px;
    padding: 16px;
}
</style>
