export const PROVIDER = {
    KAKAO: 'kakao',
    GOOGLE: 'google',
} as const;

export const URL = {
    KAKAO_LOGIN: '/kakao',
    GOOGLE_LOGIN: '/google',
    LOGOUT: '/logout',
    PROFILE: '/profile',
    REFRESH_LOGIN: '/refresh-token',
} as const;

export default {
    BASE: '/auth',
    URL: URL,
    PROVIDER: PROVIDER,
    RESPONSE: {
        REFRESH_LOGIN: 'REFRESH_LOGIN',
        LOGIN_EXPIRED: 'LOGIN_EXPIRED',
    },
    VIEW: {
        LOGOUT: '로그아웃',
        LOGIN: '로그인',
    },
} as const;
