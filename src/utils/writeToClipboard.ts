export default function writeToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}
