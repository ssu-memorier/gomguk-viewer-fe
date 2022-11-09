/**
 * 파일 업데이트 (에디터) API에 사용되는 파라미터 인터페이스 입니다.
 *
 * TODO:
 * highlights 영역은 일단 빈 문자열을 보내고, 추후 하이라이트를 저장하는 브랜치에서 별도로 추가할 예정입니다
 */
export interface IRequestFileUpdateParams {
    dir: string;
    key: string;
    data: {
        editor: object;
        highlights: '';
    };
}
