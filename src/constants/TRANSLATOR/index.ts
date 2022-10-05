import VIEW from '@/constants/TRANSLATOR/VIEW';
import LANGUAGES from '@/constants/TRANSLATOR/LANGUAGES';

export default {
    VIEW,
    LANGUAGES,
    DOMAIN: process.env.VUE_APP_TRANSLATE_DOMAIN,
    TRANSLATE_URL: '/translate',
    LATENCY: 200,
};
