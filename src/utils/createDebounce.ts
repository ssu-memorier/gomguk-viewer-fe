export default function createDebounce(
    callback: (...params: any[]) => void,
    latency: number
) {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    return function debounce(...params: unknown[]) {
        console.log(params);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
            debounceTimer = null;
            callback(...params);
        }, latency);
    };
}
