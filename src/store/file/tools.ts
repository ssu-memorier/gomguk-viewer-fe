import { ToolType } from '@/types/ToolType';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import TOOL from '@/constants/TOOL';

export const useToolsStore = defineStore('tools', () => {
    const tool = ref<ToolType>(TOOL.NONE);

    function changeTool(newTool: ToolType) {
        tool.value = newTool;
    }
    return {
        tool,
        changeTool,
    };
});
