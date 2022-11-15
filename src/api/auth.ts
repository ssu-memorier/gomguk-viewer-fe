import getAuthModel from '@/utils/getAuthModel';
import AUTH from '@/constants/AUTH';
import { Provider } from '@/types/ProviderType';
import { AuthUrlType } from '@/types/AuthUrlType';
import createResponse from '@/utils/createResponse';
import { Response } from '@/Interface/Response';

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

function getAuthUrl(provider: Provider): AuthUrlType | '' {
    switch (provider) {
        case AUTH.PROVIDER.KAKAO: {
            return AUTH.URL.KAKAO_AUTH;
        }
        case AUTH.PROVIDER.GOOGLE: {
            return AUTH.URL.GOOGLE_AUTH;
        }
        default: {
            return '';
        }
    }
}
