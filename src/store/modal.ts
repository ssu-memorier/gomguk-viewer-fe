import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const isShow = ref<boolean>(false);
    const isShowProfileMenu = ref<boolean>(false);

    function showModal() {
        isShow.value = true;
    }
    function hideModal() {
        isShow.value = false;
    }

    function toggleProfileMenu() {
        isShowProfileMenu.value = !isShowProfileMenu.value;
    }

    return {
        isShow,
        showModal,
        hideModal,
        isShowProfileMenu,
        toggleProfileMenu,
    };
});
