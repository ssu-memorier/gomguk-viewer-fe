import {
    requestFileUpload,
    requestFileList,
    requestDeleteFile,
    requestFile,
} from '@/api/storage';

import { IRequestFileListParams } from '@/Interface/api/IRequestFileListParams';
import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import { IRequestFileDeleteParams } from '@/Interface/api/IRequestFileDeleteParams';
import { IFileInfo } from '@/Interface/IFileInfo';

describe('파일 관련 API 테스트', () => {
    let listLength = -1; // 파일 개수
    test('파일 리스트 불러오기', async () => {
        /**
         * TODO:
         * 저장소의 파일 정보 리스트를 불러옵니다.
         * 파일 정보는 @/Interface/IFileInfo를 참고하세요
         */
        const params: IRequestFileListParams = {
            id: 'test_id',
        };
        const response = await requestFileList(params);
        expect(response.isSuccess).toBe(true);

        const list: IFileInfo[] = response.data;
        expect(list).toBeInstanceOf(Array);
        listLength = list.length;
    });

    test('파일 업로드', async () => {
        /**
         * TODO:
         * 유저로부터 PDF를 받아 업로드를 요청합니다.
         * 저장소엔 PDF 파일과 JSON 파일(메모장과 하이라이트 저장)이 생성됩니다.
         */
        const file = new File([''], 'test.pdf');
        const params: IRequestFileUploadParams = {
            dir: 'test_id',
            key: 'test',
            file: file,
        };
        const response = await requestFileUpload(params);

        expect(response.isSuccess).toBe(true);

        /**
         * 파일의 개수가 1개 증가해있어야함
         */
        const listParams: IRequestFileListParams = {
            id: 'test_id',
        };
        const fileListResponse = await requestFileList(listParams);
        expect(fileListResponse.data.length).toBe(listLength + 1);
        listLength = fileListResponse.data.length;
    });

    test('파일 불러오기', async () => {
        /**
         * TODO:
         * 저장소의 특정 파일 객체를 불러옵니다.
         * 파일은 메모의 정보가 담긴 JSON와 PDF 파일이 zip으로 압축되어 전달됩니다.
         */
        const params: IRequestFileParams = {
            dir: 'test_id',
            key: 'test',
        };
        const response = await requestFile(params);
        expect(response.isSuccess).toBe(true);

        expect(response.data).toBeInstanceOf(File);
    });

    test('메모장 업데이트', () => {
        /**
         * TODO:
         * 새 메모장 JSON 정보를 업로드합니다.
         */
    });

    test('파일 삭제', async () => {
        /**
         * TODO:
         * 지정한 파일을 삭제합니다.
         */
        const params: IRequestFileDeleteParams = {
            dir: 'test_id',
            key: 'test',
        };
        const response = await requestDeleteFile(params);
        expect(response.isSuccess).toBe(true);

        /**
         * 파일의 개수가 1개 감소해야함
         */
        const listParams: IRequestFileListParams = {
            id: 'test_id',
        };
        const fileListResponse = await requestFileList(listParams);
        expect(fileListResponse.data.length).toBe(listLength - 1);
    });
});
