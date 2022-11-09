import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import { requestFile } from '@/api/storage';

test('파일 불러오기', async () => {
    /**
     * TODO:
     * 저장소의 특정 파일 객체를 불러옵니다.
     * 파일은 메모의 정보가 담긴 JSON와 PDF 파일이 zip으로 압축되어 전달됩니다.
     */
    const params: IRequestFileParams = {
        dir: '',
        key: 'test',
    };
    const response = await requestFile(params);
    expect(response.isSuccess).toBe(true);
    expect(response.data).toBeInstanceOf(File);
});
