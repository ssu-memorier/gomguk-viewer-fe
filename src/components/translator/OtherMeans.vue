<template>
    <div class="otherMean">
        <span class="kind">[{{ props.kind }}]</span>
        <ul>
            <li v-for="mean in props.means" :key="mean">{{ mean }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
interface Props {
    kind: string;
    means: string[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/constants/TRANSLATOR';
div.otherMean {
    text-align: left;
}
</style>
