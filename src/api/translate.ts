import { IRequestTranslatedTextParams } from '@/Interface/api/IRequestTranslatedTextParams';
import TRANSLATOR from '@/constants/TRANSLATOR';
import getTranslateModel from '@/utils/getTranslateModel';
import { Response } from '@/Interface/Response';
import createResponse from '@/utils/createResponse';

const model = getTranslateModel();

export async function requestTranslatedText(
    option: IRequestTranslatedTextParams
): Promise<Response> {
    if (!option.text) {
        return createResponse(true, '');
    }

    try {
        const body = {
            message: option.text,
            source: option.source,
            target: option.target,
        };
        const response = await model.post(TRANSLATOR.TRANSLATE_URL, body);
        const translatedText = response.data.body.text.translated;

        return createResponse(true, translatedText);
    } catch (err) {
        return createResponse(false);
    }
}
