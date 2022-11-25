import { IRequestTranslatedTextParams } from '@/Interface/api/IRequestTranslatedTextParams';
import TRANSLATOR from '@/constants/TRANSLATOR';
import getTranslateModel from '@/utils/getTranslateModel';
import Request from '@/classes/Request';

const model = getTranslateModel();

export const requestTranslatedText = Request.create(
    async (params: IRequestTranslatedTextParams) => {
        if (!params.text) {
            return '';
        }

        const body = {
            message: params.text,
            source: params.source,
            target: params.target,
        };
        const response = await model.post(TRANSLATOR.TRANSLATE_URL, body);
        const translateResult = response.data.body;

        return translateResult;
    }
);
