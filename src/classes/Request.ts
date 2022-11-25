import Response from '@/classes/Response';

export default class Request {
    static create(
        req: (...params: any) => unknown
    ): (...params: any) => Promise<Response> {
        return async (...params: any) => {
            try {
                const result = (await req(...params)) ?? null;

                return Response.success(result);
            } catch (err) {
                if (err instanceof Error) {
                    return Response.failed(err.message);
                }

                return Response.failed();
            }
        };
    }
}
