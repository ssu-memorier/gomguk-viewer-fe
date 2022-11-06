import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const isShow = ref<boolean>(false);

    function showModal() {
        isShow.value = true;
    }
    function hideModal() {
        isShow.value = false;
    }

    return {
        isShow,
        showModal,
        hideModal,
    };
});
