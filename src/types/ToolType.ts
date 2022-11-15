import TOOL from '@/constants/TOOL';

export type ToolType = typeof TOOL[keyof typeof TOOL]; // 'none'|'eraser'
