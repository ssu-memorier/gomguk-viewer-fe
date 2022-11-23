const MB = 1024 * 1024;
const KB = 1024;

export default function size2format(size: number) {
    if (size > MB) {
        return (size / MB).toFixed(1) + 'MB';
    } else if (size > KB) {
        return (size / KB).toFixed(1) + 'KB';
    }
    return size + 'B';
}
