import STORAGE from '@/constants/STORAGE';
import createResponse from '@/utils/createResponse';
import getStorageModel from '@/utils/getStorageModel';
import { IRequestFileListParams } from '@/Interface/api/IRequestFileListParams';
import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import { Response } from '@/Interface/Response';

const model = getStorageModel();

export async function requestFileList(
    params: IRequestFileListParams
): Promise<Response> {
    try {
        const { id } = params;
        const response = await model.get(STORAGE.URL.LIST + id);
        const result = response.data.contents;

        return createResponse(true, result);
    } catch (err) {
        return createResponse(false);
    }
}

export async function requestFile(
    params: IRequestFileParams
): Promise<Response> {
    try {
        const { id, key } = params;
        const response = await model.get(`${STORAGE.URL.FILE}/${id}/${key}`);
        const result = response.data.contents;

        return createResponse(true, result);
    } catch (err) {
        return createResponse(false);
    }
}
