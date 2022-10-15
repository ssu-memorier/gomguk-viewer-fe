export default function createUpperLimit(maxValue: number) {
    return function (value: number) {
        return Math.min(value, maxValue);
    };
}
