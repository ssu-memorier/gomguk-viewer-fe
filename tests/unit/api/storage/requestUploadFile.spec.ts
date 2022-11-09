import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import { requestUploadFile, requestFileList } from '@/api/storage';

test('파일 업로드', async () => {
    /**
     * TODO:
     * 유저로부터 PDF를 받아 업로드를 요청합니다.
     * 저장소엔 PDF 파일과 JSON 파일(메모장과 하이라이트 저장)이 생성됩니다.
     */

    /**
     * 파일의 개수를 불러옴
     */
    const beforeResponse = await requestFileList();
    const listLength = beforeResponse.data.length;

    /**
     * 파일 업로드
     */
    const file = new File([''], 'test.pdf');
    const params: IRequestFileUploadParams = {
        dir: 'test_id',
        key: 'test',
        file: file,
    };
    const response = await requestUploadFile(params);

    expect(response.isSuccess).toBe(true);

    /**
     * 파일의 개수가 1개 증가해있어야함
     */
    const fileListResponse = await requestFileList();
    expect(fileListResponse.data.length).toBe(listLength + 1);
});
