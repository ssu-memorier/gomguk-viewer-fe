import NestedList from '@editorjs/nested-list';
import Header from '@editorjs/header';
import ToggleBlock from 'editorjs-toggle-block';
import SimpleImage from '@editorjs/simple-image';

const HEADER_OPS = {
    class: Header,
    config: {
        placeholder: '제목을 입력하세요',
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 2,
    },
};

const NESTED_LIST_OPS = {
    class: NestedList,
    inlineToolbar: true,
};

const TOGGLE_BLOCK_OPS = {
    class: ToggleBlock,
    inlineToolbar: true,
};

const SIMPLE_IMAGE_OPS = {
    class: SimpleImage,
};

const TOOL_CONFIG = {
    header: HEADER_OPS,
    list: NESTED_LIST_OPS,
    toggle: TOGGLE_BLOCK_OPS,
    image: SIMPLE_IMAGE_OPS,
};

export default {
    HEADER_OPS,
    NESTED_LIST_OPS,
    TOGGLE_BLOCK_OPS,
    SIMPLE_IMAGE_OPS,
    TOOL_CONFIG,
};
