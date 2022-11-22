<template>
    <div class="container">
        <div class="center">
            <span class="guideText"
                >사용할 PDF를 불러오세요. 모르는 내용을 번역하고 중요한 내용을
                노트에 필기해 논문을 집중해서 읽을 수 있습니다.</span
            >
            <round-button class="load">
                {{ LOADER.VIEW.FILE_LOAD }}
            </round-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import RoundButton from '@/components/button/RoundButton.vue';
import LOADER from '@/constants/LOADER';
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';
.load {
    padding: 1rem 3rem;
    font: $HEADER__3;
    background-color: $PRIMARY-COLOR;

    &:hover {
        background-color: $PRIMARY-COLOR__DARK;
    }
}
</style>
