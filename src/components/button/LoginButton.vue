<template>
    <button>
        <b class="label">{{ AUTH.VIEW.LOGIN }}</b>
        <img class="icon" src="@/assets/images/svg/user.svg" />
    </button>
</template>

<script setup lang="ts">
import AUTH from '@/constants/AUTH';
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme';
button {
    height: 40px;
    display: flex;
    flex-direction: row;
    border-radius: $BORDER-RADIUS__ROUND;
    padding: 0 0 0 16px;
    background-color: transparent;
    border: 1px solid $BORDER-COLOR;
    cursor: pointer;
    * {
        margin: auto 0;
    }
    b.label {
        font: $HEADER__3;
        margin-right: 8px;
    }
    img.icon {
        height: 100%;
        padding: 6px 8px 6px 0;
    }
}
</style>
