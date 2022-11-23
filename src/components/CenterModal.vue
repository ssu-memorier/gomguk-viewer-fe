<template>
    <div class="curtain" @click="modalStore.hideModal">
        <div class="modal center" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/CENTER_MODAL';
div.curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);

    div.modal {
        position: absolute;
        background-color: $SURFACE-COLOR;
        width: $CENTER_MODAL_WIDTH;
        height: $CENTER_MODAL_HEIGHT;
        border-radius: $BORDER-RADIUS__16;
        box-shadow: $SHADOW__6DP;
    }
}
.center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
