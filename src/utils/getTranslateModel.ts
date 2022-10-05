import axios from 'axios';
import TRANSLATOR from '@/constants/TRANSLATOR';

const translateModel = axios.create({
    baseURL: TRANSLATOR.DOMAIN,
});

export default function getTranslateModel() {
    return translateModel;
}
