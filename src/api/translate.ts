import { IRequestTranslatedTextParams } from '@/Interface/api/IRequestTranslatedTextParams';
import TRANSLATOR from '@/constants/TRANSLATOR';
import getTranslateModel from '@/utils/getTranslateModel';
import Response from '@/classes/Response';

const model = getTranslateModel();

export async function requestTranslatedText(
    params: IRequestTranslatedTextParams
): Promise<Response> {
    if (!params.text) {
        return Response.success('');
    }

    try {
        const body = {
            message: params.text,
            source: params.source,
            target: params.target,
        };
        const response = await model.post(TRANSLATOR.TRANSLATE_URL, body);
        const translateResult = response.data.body;

        return Response.success(translateResult);
    } catch (err) {
        if (err instanceof Error) {
            return Response.failed(err.message);
        }

        return Response.failed();
    }
}
