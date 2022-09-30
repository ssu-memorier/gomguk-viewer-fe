import type { Base64Type } from '@/types/Base64Type';

export default function getBase64(file: File): Promise<Base64Type> {
    return new Promise<Base64Type>(
        (resolve: (successValue: Base64Type) => void, reject: () => void) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject();
            };
        }
    );
}
