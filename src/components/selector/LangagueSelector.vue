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
import { defineEmits, defineProps, PropType, ref } from 'vue';
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
