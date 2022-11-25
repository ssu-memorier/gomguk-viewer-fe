import AUTH from '@/constants/AUTH';
import getAuthModel from '@/utils/getAuthModel';
import Request from '@/classes/Request';

const model = getAuthModel();

export const requestProfile = Request.create(async () => {
    const result = await model.get(AUTH.URL.PROFILE);

    return result;
});
