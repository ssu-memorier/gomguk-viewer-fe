import STORAGE from '@/constants/STORAGE';
import Request from '@/classes/Request';
import getStorageModel from '@/utils/getStorageModel';
import { IRequestFileUploadParams } from '@/Interface/api/IRequestFileUploadParams';
import { IRequestFileDeleteParams } from '@/Interface/api/IRequestFileDeleteParams';
import { IRequestFileUpdateParams } from '@/Interface/api/IRequestFileUpdateParams';
import { IRequestFileParams } from '@/Interface/api/IRequestFileParams';
import JSZip from 'jszip';
const model = getStorageModel();

export const requestFileList = Request.create(async () => {
    const response = await model.get(`${STORAGE.URL.LIST}`);
    const result = response.data.contents;

    if (response.status !== 200) throw Error(response.data.message);

    return result;
});

export const requestFile = Request.create(
    async (params: IRequestFileParams) => {
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

        return { pdf: pdfFile, metaData: metaData };
    }
);

export const requestUploadFile = Request.create(
    async (params: IRequestFileUploadParams) => {
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
    }
);

export const requestUpdateFile = Request.create(
    async (params: IRequestFileUpdateParams) => {
        const { dir, key, data } = params;
        const sendData = JSON.stringify({
            key,
            dir,
            data,
        });

        await model.put(STORAGE.URL.FILE, sendData, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
);

export const requestDeleteFile = Request.create(
    async (params: IRequestFileDeleteParams) => {
        const { dir, key } = params;
        const data = {
            dir,
            key,
        };

        await model.delete(STORAGE.URL.FILE, {
            headers: { 'Content-Type': 'application/json' },
            data,
        });
    }
);
