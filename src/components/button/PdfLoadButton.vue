<template>
    <label>
        PDF 선택
        <input
            type="file"
            id="fileLoad"
            @change="loadFileHandler"
            :accept="PDF.EXTENSION"
        />
    </label>
</template>

<script setup lang="ts">
/**
 * PdfLoadButton은 PDF 파일을 불러올 수 있는 버튼입니다.
 * PDF 파일만을 불러오도록하며, 불러온 파일이 PDF인지 검사합니다.
 */
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

    emit('load', fileList[0]);
}

function isPdfFile(file: File): boolean {
    return file.type === PDF.TYPE;
}
</script>

<style lang="scss" scoped>
label {
    display: inline-block;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 4px;
    margin: auto 0;
    padding: 0.25rem;
}
input[type='file'] {
    width: 0;
    height: 0;
}
</style>
