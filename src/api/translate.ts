import TRANSLATOR from '@/constants/TRANSLATOR';
import getTranslateModel from '@/utils/getTranslateModel';
import { Response } from '@/Interface/Response';
import createResponse from '@/utils/createResponse';

const model = getTranslateModel();

export async function requestTranslatedText(text: string): Promise<Response> {
    if (!text) {
        return createResponse(true, '');
    }

    try {
        const body = {
            message: text,
        };
        const response = await model.post(TRANSLATOR.TRANSLATE_URL, body);
        const translatedText = response.data.body.text.translated;

        return createResponse(true, translatedText);
    } catch (err) {
        return createResponse(false);
    }
}
