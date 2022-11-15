export const PROVIDER = {
    KAKAO: 'kakao',
    GOOGLE: 'google',
} as const;

export const URL = {
    KAKAO_AUTH: '/auth/kakao',
    GOOGLE_AUTH: '/auth/google',
} as const;

export default {
    DOMAIN: process.env.VUE_APP_AUTH_DOMAIN,
    URL: URL,
    PROVIDER: PROVIDER,
};
