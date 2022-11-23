import { OutputBlockData, OutputData } from '@editorjs/editorjs';

export const DEFAULT_BLOCKS = [
    {
        id: '3W6kMa4BtB',
        type: 'header',
        data: { text: '', level: 2 },
    },
] as OutputBlockData<string, any>[];

export default {
    time: 0,
    blocks: [...DEFAULT_BLOCKS],
    version: '2.25.0',
} as OutputData;
