import axios from 'axios';
import STORAGE from '@/constants/STORAGE';

const storageModel = axios.create({
    baseURL: STORAGE.DOMAIN,
});

export default function getStorageModel() {
    return storageModel;
}
