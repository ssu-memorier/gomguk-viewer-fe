import axios from 'axios';
import TRANSLATE from '@/constants/TRANSLATE';

export async function requestTranslateOriginText(text: string) {
    const response = await axios.post(TRANSLATE.HOST, {
        message: text,
    });

    return response.data.body;
}
