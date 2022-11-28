import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestProfile } from '@/api/user';
import { Profile } from '@/types/ProfileType';

export const useUserStore = defineStore('user', () => {
    const profile = ref<Profile>({});
    const isLoggined = ref<boolean>(false);

    async function getProfile() {
        const response = await requestProfile();

        if (response.isSuccess) {
            profile.value = response.payload.data;
            isLoggined.value = true;
        } else {
            profile.value = {};
            isLoggined.value = false;
        }
    }

    return {
        isLoggined,
        profile,
        getProfile,
    };
});
