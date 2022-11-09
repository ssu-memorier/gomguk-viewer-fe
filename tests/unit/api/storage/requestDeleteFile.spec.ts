import { IRequestFileDeleteParams } from '@/Interface/api/IRequestFileDeleteParams';
import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import {
    requestDeleteFile,
    requestFileList,
    requestUploadFile,
} from '@/api/storage';

test('파일 삭제', async () => {
    /**
     * TODO:
     * 지정한 파일을 삭제합니다.
     */
    /**
     * 임의의 파일 생성
     */
    const file = new File([''], 'test.pdf');
    const uploadParams: IRequestFileUploadParams = {
        dir: '',
        key: 'test12321',
        file: file,
    };
    await requestUploadFile(uploadParams);
    /**
     * 원래 파일 개수 저장
     */
    const beforeResponse = await requestFileList();
    const listLength = beforeResponse.data.length;

    /**
     * 파일 삭제
     */
    const params: IRequestFileDeleteParams = {
        dir: '',
        key: 'test12321',
    };
    const response = await requestDeleteFile(params);
    expect(response.isSuccess).toBe(true);

    /**
     * 파일의 개수가 1개 감소해야함
     */
    const fileListResponse = await requestFileList();
    expect(fileListResponse.data.length).toBe(listLength - 1);
});
