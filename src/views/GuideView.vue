<template>
    <div class="container">
        <div class="center">
            <span class="guideText">{{ GUIDE.GUIDE_TEXT }}</span>
            <round-button class="load" @click="modalStore.showModal">
                {{ GUIDE.FILE_LOAD }}
            </round-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import RoundButton from '@/components/button/RoundButton.vue';
import GUIDE from '@/constants/GUIDE';
import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .guideText {
        display: inline-block;
        margin-bottom: 3rem;
    }
    .load {
        padding: 1rem 3rem;
        font: $HEADER__3;
        background-color: $PRIMARY-COLOR;

        &:hover {
            background-color: $PRIMARY-COLOR__DARK;
        }
    }
}
</style>
