<template>
    <div class="otherMean">
        <span class="kind">{{ props.kind }}</span>
        <ol>
            <li v-for="mean in props.means" :key="mean">{{ mean }}</li>
        </ol>
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
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/TRANSLATOR';
div.otherMean {
    text-align: left;

    .kind {
        font-size: $FONT__LARGE;
        font-weight: bold;
    }

    ol {
        font-size: $FONT__REGULAR;
    }
}
</style>
