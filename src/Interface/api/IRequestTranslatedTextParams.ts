import type { LanguageType } from '@/types/LanguageType';
/**
 * requestTranslatedTextParams 요청시 사용되는 파라미터입니다.
 */
export interface IRequestTranslatedTextParams {
    source: LanguageType;
    target: LanguageType;
    text: string;
}
