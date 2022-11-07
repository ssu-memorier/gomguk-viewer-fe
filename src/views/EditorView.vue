<template>
    <div id="editorjs"></div>
</template>
<script setup lang="ts">
import editor from '@/store/editor';

const editorJs = editor.createEditor('editorjs');
</script>
<style lang="scss" scoped>
@import '@/assets/scss/theme';

#editorjs {
    background-color: $SURFACE-COLOR;
    text-align: left;
    max-width: calc(650px + 8rem);
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    font-family: 'Nanum Gothic', 'Roboto', sans-serif;
    transition: 0.3s;
    padding: 1rem 5rem;
}
</style>
