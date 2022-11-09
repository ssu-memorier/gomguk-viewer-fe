import { IRequestFileDeleteParams } from '@/Interface/api/IRequestFileDeleteParams';
import { IRequestFileListParams } from '@/Interface/api/IRequestFileListParams';
import { requestDeleteFile, requestFileList } from '@/api/storage';

test('파일 삭제', async () => {
    /**
     * TODO:
     * 지정한 파일을 삭제합니다.
     */
    /**
     * 원래 파일 개수
     */
    const beforeParams: IRequestFileListParams = {
        id: 'test_id',
    };
    const beforeResponse = await requestFileList(beforeParams);
    const listLength = beforeResponse.data.length;

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
