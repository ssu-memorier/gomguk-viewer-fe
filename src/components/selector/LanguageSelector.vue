<template>
    <select @change="changeOption">
        <option
            v-for="LANG in LANGUAGES"
            :key="LANG.KEY"
            :value="LANG.KEY"
            :selected="LANG.KEY === props.selected ?? EN"
        >
            {{ LANG.NAME }}
        </option>
    </select>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import { LanguageType } from '@/types/LanguageType';
import LANGUAGES, { EN } from '@/constants/TRANSLATOR/LANGUAGES';
const emit = defineEmits<{
    (e: 'change', lang: LanguageType): void;
}>();

const props = defineProps({
    selected: {
        type: String as PropType<LanguageType>,
        required: false,
    },
});

function changeOption(evt: Event) {
    const $target = evt.target as HTMLOptionElement;
    const lang = $target.value as LanguageType;

    emit('change', lang);
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';
select {
    border: 1px solid $BORDER-COLOR__LIGHT;
    border-radius: $BORDER-RADIUS__ROUND;
    padding: 0 0.5rem;
    text-align: center;
    font-size: 1.05rem;
    background-color: $SURFACE-COLOR;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    cursor: pointer;
    &:hover {
        border: 1px solid $PRIMARY-COLOR;
    }
    &:focus {
        outline: none;
        border: 1px solid $BORDER-COLOR__LIGHT;
    }
    background: url('@/assets/images/svg/chervon-down.svg') no-repeat right 12px
        center;
}
.icon {
    aspect-ratio: 1 /1;
    width: 20px;
}
</style>
