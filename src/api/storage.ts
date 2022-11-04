import STORAGE from '@/constants/STORAGE';
import createResponse from '@/utils/createResponse';
import getStorageModel from '@/utils/getStorageModel';
import { IRequestFileListParams } from '@/Interface/api/IRequestFileListParams';
import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import { Response } from '@/Interface/Response';

const model = getStorageModel();

export async function requestFileList(
    params: IRequestFileListParams
): Promise<Response> {
    try {
        const { id } = params;
        const response = await model.get(`${STORAGE.URL.LIST}/${id}`);
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
        const response = await model.get(`${STORAGE.URL.FILE}/${key}`, {
            responseType: 'blob',
        });
        const file = new File([response.data], 'temp.pdf', {
            type: 'application/pdf',
        });

        return createResponse(true, file);
    } catch (err) {
        return createResponse(false);
    }
}

export async function requestFileUpload(
    params: IRequestFileUploadParams
): Promise<Response> {
    try {
        const { id, file, key } = params;
        const formData = new FormData();

        formData.append('data', file);
        await model.post(`${STORAGE.URL.FILE}/${id}/${key}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return createResponse(true);
    } catch (err) {
        return createResponse(false);
    }
}
