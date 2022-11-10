import { IRequestFileUpdateParams } from '@/Interface/api/IRequestFileUpdateParams';
import { requestUpdateFile } from '@/api/storage';

test('메모장 업데이트', async () => {
    /**
     * TODO:
     * 새 메모장 JSON 정보를 업로드합니다.
     */
    const params: IRequestFileUpdateParams = {
        dir: '',
        key: 'test',
        data: {
            editor: {
                content: 'memo content',
            },
            highlights: [],
        },
    };
    const response = await requestUpdateFile(params);
    expect(response.isSuccess).toBe(true);
});
