<template>
    <div
        class="curtain"
        :class="{ show: props.show }"
        @click="modalStore.hideModal"
    >
        <div class="modal center card" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useModalStore } from '@/store/modal';
const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
});
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
    z-index: -1;
    display: flex;
    flex-direction: row;
    align-items: center;

    div.modal {
        background-color: white;
        width: 800px;
        max-width: 80%;
        height: 600px;
        max-height: 80%;
        z-index: -1;
        border-radius: 8px;
        margin: 0 auto;
        overflow: hidden;
    }

    &.show {
        z-index: 1000;
    }
}
</style>
