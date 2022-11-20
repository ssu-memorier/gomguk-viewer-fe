<template>
    <div class="curtain" @click="modalStore.hideModal">
        <div class="modal center card" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/store/modal';

const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
div.curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;

    div.modal {
        background-color: white;
        width: 800px;
        max-width: 80%;
        height: 600px;
        max-height: 80%;
        border-radius: 8px;
        margin: 0 auto;
        overflow: hidden;
    }
}
</style>
