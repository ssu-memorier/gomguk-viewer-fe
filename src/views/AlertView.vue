<template>
    <ul class="messageView">
        <li
            class="alert"
            v-for="alert in alertList"
            :key="alert.time.toString()"
        >
            {{ alert.message }}
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/alert';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore();
const { alertList } = storeToRefs(alertStore);
</script>
<style scoped lang="scss">
ul {
    list-style: none;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
}
</style>
