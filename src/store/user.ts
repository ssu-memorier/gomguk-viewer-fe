import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestProfile } from '@/api/user';
export const useUserStore = defineStore('user', () => {
    const isLoggined = ref<boolean>(false);
    const userName = ref<string>('');

    async function getProfile() {
        const response = await requestProfile();
        if (response.isSuccess) {
            userName.value = response.data.name;
            isLoggined.value = true;
        } else {
            userName.value = '';
            isLoggined.value = false;
        }
    }

    return {
        isLoggined,
        userName,
        getProfile,
    };
});
