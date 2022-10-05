import type { LanguageType } from '@/types/LanguageType';
/**
 * 텍스트 번역 API에 사용되는 파라미터 인터페이스 입니다.
 */
export interface IRequestTranslatedTextParams {
    source: LanguageType;
    target: LanguageType;
    text: string;
}
