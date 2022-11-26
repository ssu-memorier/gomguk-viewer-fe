<template>
    <label>
        파일 선택
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
import MESSAGE from '@/constants/MESSAGE';
import { useAlertStore } from '@/store/alert';
const emit = defineEmits<{
    (e: 'load', file: File): void;
}>();
const alertStore = useAlertStore();

function loadFileHandler(e: Event) {
    if (!e.target) return;

    const $input = e.target as HTMLInputElement;
    const fileList = $input.files;

    if (!fileList || fileList.length <= 0) return;

    const file = fileList[0];
    if (!isPdfFile(file)) {
        alertStore.pushAlert({
            time: new Date(),
            message: MESSAGE.PDF.IS_NOT_PDF,
        });
        // window.alert(MESSAGE.PDF.IS_NOT_PDF);
        return;
    }
    if (isExceedLimit(file)) {
        alertStore.pushAlert({
            time: new Date(),
            message: MESSAGE.PDF.EXCEED_LIMIT,
        });
        // window.alert(MESSAGE.PDF.EXCEED_LIMIT);
        return;
    }

    emit('load', file);
}

function isPdfFile(file: File): boolean {
    return file.type === PDF.TYPE;
}

function isExceedLimit(file: File): boolean {
    return file.size > PDF.MAX_FILE_SIZE;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
label {
    display: inline-block;
    cursor: pointer;
    border: 1px solid $BORDER-COLOR;
    border-radius: 4px;
    margin: auto 0;
    padding: 0.25rem 2rem;
    background-color: $SURFACE-COLOR;

    &:hover {
        background-color: $SURFACE-COLOR__HOVER;
    }
}
input[type='file'] {
    width: 0;
    height: 0;
}
</style>
