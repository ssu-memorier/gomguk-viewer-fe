import AUTH from '@/constants/AUTH';
import getAuthModel from '@/utils/getAuthModel';
import Response from '@/classes/Response';

const model = getAuthModel();

export async function requestProfile(): Promise<Response> {
    try {
        const result = await model.get(AUTH.URL.PROFILE);

        return Response.success(result);
    } catch (err) {
        if (err instanceof Error) {
            return Response.failed(err.message);
        }

        return Response.failed();
    }
}
