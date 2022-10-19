import { SizeType } from '@/types/SizeType';

/**
 * 요소의 크기를 size로 변경하는 함수
 * @param el size를 조정할 요소
 * @param size 조정할 크기
 */
export default function resizeElement(
    el: HTMLElement | undefined,
    size: SizeType
) {
    if (!el) return;

    el.style.width = Math.floor(size.width) + 'px';
    el.style.height = Math.floor(size.height) + 'px';
}
