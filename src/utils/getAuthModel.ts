import axios from 'axios';
import AUTH from '@/constants/AUTH';

const authModel = axios.create({
    baseURL: AUTH.DOMAIN,
});

export default function getAuthModel() {
    return authModel;
}
