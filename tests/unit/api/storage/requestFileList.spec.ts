import { IFileInfo } from '@/Interface/IFileInfo';
import { requestFileList } from '@/api/storage';

test('파일 리스트 불러오기', async () => {
    /**
     * 저장소의 파일 정보 리스트를 불러옵니다.
     * 파일 정보는 @/Interface/IFileInfo를 참고하세요
     */
    const response = await requestFileList();
    expect(response.isSuccess).toBe(true);

    const list: IFileInfo[] = response.data;
    expect(list).toBeInstanceOf(Array);
});
