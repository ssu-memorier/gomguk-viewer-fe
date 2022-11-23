import FILE from '@/constants/FILE';

export default function size2format(size: number) {
    if (size > FILE.SIZE.MB) {
        return (size / FILE.SIZE.MB).toFixed(1) + 'MB';
    } else if (size > FILE.SIZE.KB) {
        return (size / FILE.SIZE.KB).toFixed(1) + 'KB';
    }
    return size + 'B';
}
