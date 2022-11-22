<template>
    <div class="container">
        <div class="center">
            <span class="guideText"
                >사용할 PDF를 불러오세요. 모르는 내용을 번역하고 중요한 내용을
                노트에 필기해 논문을 집중해서 읽을 수 있습니다.</span
            >
            <round-button class="load" @click="modalStore.showModal">
                {{ LOADER.VIEW.FILE_LOAD }}
            </round-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import RoundButton from '@/components/button/RoundButton.vue';
import LOADER from '@/constants/LOADER';
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
