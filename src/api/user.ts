import AUTH from '@/constants/AUTH';
import getAuthModel from '@/utils/getAuthModel';
import { Response } from '@/Interface/Response';
import createResponse from '@/utils/createResponse';

const model = getAuthModel();

export async function requestProfile(): Promise<Response> {
    try {
        const response = await model.get(AUTH.URL.PROFILE);

        return createResponse(true, response);
    } catch (err) {
        return createResponse(false);
    }
}
