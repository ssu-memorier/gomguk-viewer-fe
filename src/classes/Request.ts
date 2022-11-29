import Response from '@/classes/Response';
import { AxiosError } from 'axios';

export default class Request {
    static create(
        req: (...params: any) => unknown
    ): (...params: any) => Promise<Response> {
        return async (...params: any) => {
            try {
                const result = (await req(...params)) ?? null;

                return Response.success(result);
            } catch (err) {
                if (err instanceof AxiosError) {
                    return Response.failed(err.response?.data);
                }

                return Response.failed();
            }
        };
    }
}
