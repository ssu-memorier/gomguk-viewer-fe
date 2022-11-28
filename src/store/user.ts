import { defineStore } from 'pinia';
import { ref } from 'vue';
import { requestProfile } from '@/api/user';
export const useUserStore = defineStore('user', () => {
    const isLoggined = ref<boolean>(false);
    const userName = ref<string>('');
    const profileImage = ref<string>('');
    const thumbnailProfileImage = ref<string>('');

    async function getProfile() {
        const response = await requestProfile();
        if (response.isSuccess) {
            userName.value = response.payload.name;
            profileImage.value = response.payload.profileImage;
            thumbnailProfileImage.value =
                response.payload.thumbnailProfileImage;
            isLoggined.value = true;
        } else {
            userName.value = '';
            profileImage.value = '';
            thumbnailProfileImage.value = '';
            isLoggined.value = false;
        }
    }

    return {
        isLoggined,
        userName,
        profileImage,
        thumbnailProfileImage,
        getProfile,
    };
});
