import AUTH from '@/constants/AUTH';
import axios from 'axios';

const storageModel = axios.create({
    baseURL: AUTH.BASE,
});

export default function getStorageModel() {
    return storageModel;
}
