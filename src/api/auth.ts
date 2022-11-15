import getAuthModel from '@/utils/getAuthModel';
import { Provider } from '@/types/ProviderType';
import createResponse from '@/utils/createResponse';
import { Response } from '@/Interface/Response';
import getAuthUrl from '@/utils/getAuthUrl';

const model = getAuthModel();

export async function requestLogin(provider: Provider): Promise<Response> {
    try {
        const url = getAuthUrl(provider);
        if (url === '') {
            return createResponse(false);
        }

        const response = await model.get(url);
        const result = response.data.contents;

        return createResponse(true, result);
    } catch (err) {
        return createResponse(false);
    }
}
