<template>
    <transition-group class="messageView" name="list" tag="ul">
        <li
            class="alert"
            v-for="alert in alertList"
            :key="alert.time.toString()"
        >
            {{ alert.message }}
        </li>
    </transition-group>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/alert';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore();
const { alertList } = storeToRefs(alertStore);
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/ALERT';

ul {
    list-style: none;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;

    li.alert {
        display: inline-block;
        border-radius: $BORDER-RADIUS__ROUND;
        width: 100%;
        max-width: $ALERT-MAX-WIDTH;
        height: $ALERT-HEIGHT;
        background-color: $ALERT-SURFACE;
        color: $ALERT-ON-SURFACE;
        padding: $ALERT-PADDING;
        margin: $ALERT-MARGIN;
        font: $ALERT-FONT;
    }
}
.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
