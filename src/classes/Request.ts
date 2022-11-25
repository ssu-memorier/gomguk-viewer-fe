import Response from '@/classes/Response';

export default class Request {
    static create(req: () => unknown): () => Promise<Response> {
        return async () => {
            try {
                const result = await req();

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
