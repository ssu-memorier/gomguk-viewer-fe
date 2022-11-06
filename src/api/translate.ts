import { IRequestTranslatedTextParams } from '@/Interface/api/IRequestTranslatedTextParams';
import TRANSLATOR from '@/constants/TRANSLATOR';
import getTranslateModel from '@/utils/getTranslateModel';
import { Response } from '@/Interface/Response';
import createResponse from '@/utils/createResponse';

const model = getTranslateModel();

export async function requestTranslatedText(
    params: IRequestTranslatedTextParams
): Promise<Response> {
    if (!params.text) {
        return createResponse(true, '');
    }

    try {
        const body = {
            message: params.text,
            source: params.source,
            target: params.target,
        };
        const response = await model.post(TRANSLATOR.TRANSLATE_URL, body);
        const translateResult = response.data.body;

        return createResponse(true, translateResult);
    } catch (err) {
        return createResponse(false);
    }
}
