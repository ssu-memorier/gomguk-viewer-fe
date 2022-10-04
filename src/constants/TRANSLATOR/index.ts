import VIEW from '@/constants/TRANSLATOR/VIEW';

export default {
    VIEW,
    DOMAIN: process.env.VUE_APP_TRANSLATE_DOMAIN,
    TRANSLATE_URL: '/translate',
    LATENCY: 200,
};
