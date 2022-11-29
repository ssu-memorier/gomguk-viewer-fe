import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestProfile, requestRefreshLogin } from '@/api/user';
import { Profile } from '@/types/ProfileType';
import changeLocation from '@/utils/changeLocation';
import AUTH from '@/constants/AUTH';

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

    async function logout() {
        changeLocation(AUTH.BASE + AUTH.URL.LOGOUT);
        isLoggined.value = false;
        profile.value = {};
    }

    async function refreshLogin() {
        await requestRefreshLogin();
    }
    return {
        isLoggined,
        profile,
        getProfile,
        logout,
        refreshLogin,
    };
});
