import {
    requestFileUpload,
    requestFileList,
    requestDeleteFile,
    requestFile,
} from '@/api/storage';

describe('파일 업로드', () => {
    /**
     * TODO:
     * 유저로부터 PDF를 받아 업로드를 요청합니다.
     * 저장소엔 PDF 파일과 JSON 파일(메모장과 하이라이트 저장)이 생성됩니다.
     */
});

describe('파일 리스트 불러오기', () => {
    /**
     * TODO:
     * 저장소의 파일 정보 리스트를 불러옵니다.
     * 파일 정보는 @/Interface/IFileInfo를 참고하세요
     */
});

describe('파일 불러오기', () => {
    /**
     * TODO:
     * 저장소의 특정 파일 객체를 불러옵니다.
     * 파일은 메모의 정보가 담긴 JSON와 PDF 파일이 zip으로 압축되어 전달됩니다.
     */
});

describe('메모장 업데이트', () => {
    /**
     * TODO:
     * 새 메모장 JSON 정보를 업로드합니다.
     */
});

describe('파일 삭제', () => {
    /**
     * TODO:
     * 지정한 파일을 삭제합니다.
     */
});
