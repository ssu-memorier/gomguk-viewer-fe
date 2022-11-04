/**
 * 파일 업로드 API에 사용되는 파라미터 인터페이스 입니다.
 */
export interface IRequestFileUploadParams {
    dir: string;
    key: string;
    file: File;
}
