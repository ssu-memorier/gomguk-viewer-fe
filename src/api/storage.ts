import STORAGE from '@/constants/STORAGE';
import createResponse from '@/utils/createResponse';
import getStorageModel from '@/utils/getStorageModel';
import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import { IRequestFileDeleteParams } from '@/Interface/api/IRequestFileDeleteParams';
import { IRequestFileUpdateParams } from '@/Interface/api/IRequestFileUpdateParams';
import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import { Response } from '@/Interface/Response';
import JSZip from 'jszip';
const model = getStorageModel();

export async function requestFileList(): Promise<Response> {
    try {
        const response = await model.get(`${STORAGE.URL.LIST}`);
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
        const { key } = params;
        const response = await model.get(STORAGE.URL.FILE, {
            params,
            responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/zip' });
        const zip = new JSZip();
        const zipObj = await zip.loadAsync(blob);
        const files = zipObj.files;
        const pdfBlob = await files[`${key}.pdf`].async('blob');
        const jsonStr = await files[`${key}.json`].async('text');
        const pdfFile = new File([pdfBlob], `${key}.pdf`);
        const metaData = JSON.parse(jsonStr);

        return createResponse(true, { pdf: pdfFile, metaData: metaData });
    } catch (err) {
        return createResponse(false);
    }
}

export async function requestUploadFile(
    params: IRequestFileUploadParams
): Promise<Response> {
    try {
        const { dir, file, key } = params;
        const formData = new FormData();

        formData.append('dir', dir);
        formData.append('key', key);
        formData.append('data', file);
        await model.post(STORAGE.URL.FILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return createResponse(true);
    } catch (err) {
        return createResponse(false);
    }
}
export async function requestUpdateFile(
    params: IRequestFileUpdateParams
): Promise<Response> {
    try {
        const { dir, key, data } = params;
        const sendData = JSON.stringify({
            key,
            dir,
            data,
        });

        await model.put(STORAGE.URL.FILE, sendData, {
            headers: { 'Content-Type': 'application/json' },
        });

        return createResponse(true);
    } catch (err) {
        return createResponse(false);
    }
}

export async function requestDeleteFile(
    params: IRequestFileDeleteParams
): Promise<Response> {
    try {
        const { dir, key } = params;
        const data = {
            dir,
            key,
        };

        await model.delete(STORAGE.URL.FILE, {
            headers: { 'Content-Type': 'application/json' },
            data,
        });

        return createResponse(true);
    } catch (err) {
        return createResponse(false);
    }
}
