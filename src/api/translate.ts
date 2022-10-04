import TRANSLATE from '@/constants/TRANSLATE';
import getTranslateModel from '@/utils/getTranslateModel';
import { Success } from '@/Interface/Response/Success';
import { Failed } from '@/Interface/Response/Failed';

const model = getTranslateModel();

export async function requestTranslatedText(
    text: string
): Promise<Success | Failed> {
    if (!text)
        return {
            isSuccess: true,
            data: '',
        };

    try {
        const body = {
            message: text,
        };
        const response = await model.post(TRANSLATE.TRANSLATE_URL, body);
        const translatedText = response.data.body.text.translated;

        return {
            isSuccess: true,
            data: translatedText,
        };
    } catch (err) {
        return {
            isSuccess: false,
        };
    }
}
