export default function upperLimit(maxValue: number) {
    return function (value: number) {
        return Math.min(value, maxValue);
    };
}
