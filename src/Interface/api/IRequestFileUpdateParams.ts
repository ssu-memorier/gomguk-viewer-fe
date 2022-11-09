/**
 * 파일 업데이트 (에디터) API에 사용되는 파라미터 인터페이스 입니다.
 */
export interface IRequestFileUpdateParams {
    dir: string;
    key: string;
    data: {
        editor: object;
        highlights: Array<any>;
    };
}
