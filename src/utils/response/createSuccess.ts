import { Success } from '@/Interface/Response/Success';

export default function createSuccess(data: any): Success {
    return {
        isSuccess: true,
        data,
    };
}
