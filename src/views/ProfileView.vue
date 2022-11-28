<template>
    <div class="profile">
        <img class="profileImage" :src="profileImage" v-if="profileImage" />
        <img class="profileImage" src="@/assets/images/svg/user.svg" v-else />
        <span class="userName">{{ userName || 'user name' }}</span>
        <small class="provider">kakao</small>
        <hr class="boundary" />
        <logout-button></logout-button>
    </div>
</template>
<script setup lang="ts">
import LogoutButton from '@/components/button/LogoutButton.vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userName, profileImage } = storeToRefs(userStore);
</script>
<style scoped lang="scss">
.profile {
    display: flex;
    flex-direction: column;
    & > * {
        margin: 0 auto;
    }

    .profileImage {
        width: 128px;
        height: 128px;
        border-radius: 50%;
    }
    .userName {
        margin-top: 1rem;
        font-weight: 800;
        font-size: 1.4rem;
    }
    .provider {
        margin-top: 0.5rem;
        font-size: 1rem;
    }
    .boundary {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
}
</style>
