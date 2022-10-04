import { Response } from '@/Interface/Response';

export default function createResponse(
    isSuccess: boolean,
    data?: any
): Response {
    if (isSuccess) {
        return {
            isSuccess,
            data,
        };
    }
    return {
        isSuccess,
    };
}
