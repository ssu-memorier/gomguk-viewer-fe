import { Response } from '@/Interface/Response';

export default function createResponse(
    isSuccess: boolean,
    data?: any
): Response {
    return {
        isSuccess,
        data,
    };
}
