import { URL } from '@/constants/AUTH';

export type AuthUrlType = typeof URL[keyof typeof URL]; // '/auth/kakao' | '/auth/google'
