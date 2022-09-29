<template>
    <label
        >PDF 선택
        <input
            type="file"
            id="fileLoad"
            @change="loadFileHandler"
            accept=".pdf"
        />
    </label>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import PDF from '@/constants/PDF';

const emit = defineEmits<{
    (e: 'load', file: File): void;
}>();

function loadFileHandler(e: Event) {
    if (!e.target) return;

    const $input = e.target as HTMLInputElement;
    const fileList = $input.files;

    if (!fileList || fileList.length <= 0) return;

    if (!isPdfFile(fileList[0])) return;
    console.log(fileList[0]);
    emit('load', fileList[0]);
}

function isPdfFile(file: File) {
    return file.type === PDF.TYPE;
}
</script>

<style lang="scss" scoped></style>
