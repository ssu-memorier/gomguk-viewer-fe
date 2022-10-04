import axios from 'axios';
import TRANSLATE from '@/constants/TRANSLATE';

const translateModel = axios.create({
    baseURL: TRANSLATE.DOMAIN,
});

export default function getTranslateModel() {
    return translateModel;
}
