import { PROVIDER } from '@/constants/AUTH';

export type KAKAO = 'kakao';
export type GOOGLE = 'google';
export type Provider = typeof PROVIDER[keyof typeof PROVIDER]; // 'kakao' | 'google'
