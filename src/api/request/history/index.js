import axios from 'axios';
import {getToken} from '@hooks/token';
import getBaseURL from '@hooks/urls';

async function fetchData(endpoint) {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data || res.data;
    } catch (error) {
        console.error(error);
        const err = error?.response?.data || { message: 'An error occurred' };
        throw new Error(err.message);
    }
}

export async function getExtractDonate() {
    return await fetchData('/usuarios/doacoes');
}
export async function getExtractNotas() {
    return await fetchData('/usuarios/notas');
}

export async function getExtractSingle(type, id) {
    const path = type === 'Notas fiscais' ? `/usuarios/notas/single/${id}` :
        type === 'Doações' ? `/usuarios/doacoes/single/${id}` : null;
    if (!path) throw new Error('Invalid type provided');
    return await fetchData(path);
}
