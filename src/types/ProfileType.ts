import { Provider } from '@/types/ProviderType';

export type Profile = {
    name?: string;
    profileImage?: string;
    thumbnailProfileImage?: string;
    provider?: Provider;
};
