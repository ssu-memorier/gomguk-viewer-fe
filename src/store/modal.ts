import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const isShow = ref<boolean>(false);
    const isShowProfileMenu = ref<boolean>(false);
    const isShowLoginMethods = ref<boolean>(false);

    function showModal() {
        isShow.value = true;
    }
    function hideModal() {
        isShow.value = false;
    }

    function toggleProfileMenu() {
        isShowProfileMenu.value = !isShowProfileMenu.value;
    }

    function toggleLoginMethods() {
        isShowLoginMethods.value = !isShowLoginMethods.value;
    }

    return {
        isShow,
        showModal,
        hideModal,
        isShowProfileMenu,
        toggleProfileMenu,
        isShowLoginMethods,
        toggleLoginMethods,
    };
});
