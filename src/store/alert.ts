import { defineStore } from 'pinia';
import { ref } from 'vue';
import ALERT from '@/constants/ALERT';

type Alert = { time: Date; message: string };
export const useAlertStore = defineStore('message', () => {
    const alertList = ref<Alert[]>([]);

    function pushAlert(alert: Alert) {
        alertList.value.push(alert);
        setTimeout(() => {
            alertList.value.shift();
        }, ALERT.TIMEOUT);
    }

    return {
        alertList,
        pushAlert,
    };
});
