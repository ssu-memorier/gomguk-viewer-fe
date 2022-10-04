import { Failed } from '@/Interface/Response/Failed';

export default function createFailed(): Failed {
    return {
        isSuccess: false,
    };
}
