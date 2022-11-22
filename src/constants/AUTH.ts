export const PROVIDER = {
    KAKAO: 'kakao',
    GOOGLE: 'google',
} as const;

export const URL = {
    KAKAO_LOGIN: '/kakao',
    GOOGLE_LOGIN: '/google',
    LOGOUT: '/logout',
    PROFILE: '/profile',
} as const;

export default {
    BASE: '/auth',
    URL: URL,
    PROVIDER: PROVIDER,
    VIEW: {
        LOGOUT: '로그아웃',
        LOGIN: '로그인',
    },
} as const;
