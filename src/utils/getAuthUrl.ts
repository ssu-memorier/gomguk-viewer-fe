import AUTH from '@/constants/AUTH';
import { AuthUrlType } from '@/types/AuthUrlType';
import { Provider } from '@/types/ProviderType';

export default function getAuthUrl(provider: Provider): AuthUrlType | '' {
    switch (provider) {
        case AUTH.PROVIDER.KAKAO: {
            return AUTH.URL.KAKAO_AUTH;
        }
        case AUTH.PROVIDER.GOOGLE: {
            return AUTH.URL.GOOGLE_AUTH;
        }
        default: {
            return '';
        }
    }
}
