import FILE from '@/constants/FILE';

/**
 * size를 받아 MB,KB 형태로 변환해 반환하는 함수
 * 소수점 1자리까지 같이 출력함 (ex. 2000B -> 1.9KB)
 *
 * @param size
 * @returns [number]MB | [number]KB | [number]B
 */
export default function size2format(size: number) {
    if (size > FILE.SIZE.MB) {
        return (size / FILE.SIZE.MB).toFixed(1) + 'MB';
    } else if (size > FILE.SIZE.KB) {
        return (size / FILE.SIZE.KB).toFixed(1) + 'KB';
    }
    return size + 'B';
}
