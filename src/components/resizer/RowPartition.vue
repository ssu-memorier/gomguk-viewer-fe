<template>
    <div
        class="rowResizer"
        @mousemove="resize"
        @mouseup="resizeEnd"
        :style="{ width: `${props.boxWidth}px` }"
        ref="$rowResizer"
    >
        <div v-if="isLeftFold" class="folded leftFold" @click="open('left')">
            {{ leftName }}
        </div>
        <div
            class="left"
            :style="{ width: `${leftWidth}px` }"
            :class="{ hide: isLeftFold }"
        >
            <slot name="left"></slot>
        </div>
        <div
            v-if="!isLeftFold && !isRightFold"
            ref="$resizer"
            class="resizer"
            :style="{
                transform: `translateX(${leftWidth - RESIZER.LEN / 2}px)`,
            }"
            @mousedown="resizeStart"
        >
            <div class="line"></div>
        </div>
        <div v-if="isRightFold" class="folded rightFold" @click="open('right')">
            {{ rightName }}
        </div>
        <div
            class="right"
            :style="{ width: `${rightWidth}px` }"
            :class="{ hide: isRightFold }"
        >
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, defineProps, watch } from 'vue';
import RESIZER from '@/constants/RESIZER';

const props = defineProps({
    leftName: {
        type: String,
        required: true,
    },
    rightName: {
        type: String,
        required: true,
    },
    minWidth: {
        type: Number,
        default: 0,
    },

    maxWidth: {
        type: Number,
        default: 0,
    },
    boxWidth: {
        type: Number,
        required: true,
        validator(value: number) {
            return value > 0;
        },
    },
    leftPercent: {
        type: Number,
        validator(value: number) {
            return 0 < value && value < 1;
        },
    },
});
const $resizer = ref();
const $rowResizer = ref();
const boxOffset = ref<number>(0);
const leftPercent = ref<number>(props.leftPercent ?? 0.5);
const isResizing = ref<boolean>(false);
const leftWidth = computed(() => {
    if (isLeftFold.value) return 20;
    if (isRightFold.value) return props.boxWidth - 20;

    const width = props.boxWidth * leftPercent.value;
    if (width < props.minWidth) {
        return props.minWidth;
    }
    if (width > props.maxWidth) {
        return props.maxWidth;
    }
    return width;
});
const rightWidth = computed(() => props.boxWidth - leftWidth.value);
const isLeftFold = ref<boolean>(false);
const isRightFold = ref<boolean>(false);
watch(leftPercent, (value) => {
    if (value < 0.1) {
        isLeftFold.value = true;
        leftPercent.value = 0;
    } else if (value > 0.9) {
        isRightFold.value = true;
        leftPercent.value = 1;
    }
});
onMounted(() => {
    const rect = $rowResizer.value.getBoundingClientRect();
    boxOffset.value = rect.x;
});

function resizeStart() {
    isResizing.value = true;
}
function resizeEnd() {
    isResizing.value = false;
}
function resize(evt: MouseEvent) {
    if (!isResizing.value) return;

    leftPercent.value = (evt.clientX - boxOffset.value) / props.boxWidth;
}
function open(direct: 'left' | 'right') {
    if (direct === 'left') {
        isLeftFold.value = false;
        leftPercent.value = 0.1;
    } else {
        isRightFold.value = false;
        leftPercent.value = 0.9;
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/theme';
@import '@/assets/scss/constants/RESIZER';
.rowResizer {
    position: relative;
    display: flex;
    flex-direction: row;

    .left,
    .right {
        position: relative;
    }
    .left.hide {
        transform: translateX(-100px);
    }
    .right.hide {
        transform: translateX(100px);
    }
}
div.resizer {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: $RESIZER_LEN;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    will-change: transform;
    cursor: ew-resize;
    div.line {
        width: $RESIZER_LINE_LEN;
        height: 100%;
        background-color: lightgray;
        transition: 0.3s;
    }
    &:hover {
        div.line {
            width: $RESIZER_LEN;
            height: 100%;
        }
    }
}
.folded {
    position: absolute;
    width: 20px;
    z-index: 100;
    background-color: $SURFACE-COLOR;
    height: 100%;
    writing-mode: vertical-lr;
    cursor: pointer;
    user-select: none;
    &.leftFold {
        left: 0;
        border-right: 1px solid $BORDER-COLOR;
        text-orientation: upright;
    }
    &.rightFold {
        right: 0;
        border-left: 1px solid $BORDER-COLOR;
        text-orientation: upright;
    }
}
</style>
