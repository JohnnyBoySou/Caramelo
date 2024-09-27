import axios from 'axios';
import { getToken } from '@hooks/token';
import getBaseURL from '@hooks/urls';

async function postData(endpoint, data, token = null) {
    const BASE_URL = await getBaseURL();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
        return response.data.message;
    } catch (error) {
        console.error(error);
        let errMsg;
        try {
            const err = error?.response?.data || { message: 'An error occurred' };
            errMsg = err.message;
        } catch (e) {
            errMsg = error.message;
        }
        throw new Error(errMsg);
    }
}


async function postDataAnonimo(endpoint, data,) {
    const BASE_URL = await getBaseURL();

    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data);
        return response.data.message;
    } catch (error) {
        console.error(error);
        let errMsg;
        try {
            const err = error?.response?.data || { message: 'An error occurred' };
            errMsg = err.message;
        } catch (e) {
            errMsg = error.message;
        }
        throw new Error(errMsg);
    }
}

export async function sendNotafiscal(notas) {
    const token = await getToken();
    return await postData('/usuarios/doar/nota', { notas: notas, instituicao_id: 16, }, token);
}

export async function sendNotafiscalAnonima(notas) {
    return await postDataAnonimo('/usuarios/doar/variasanonima', { instituicao_id: 16, notas, });
}

export async function verifyNota(params) {
    return await postData('/usuarios/validar/nota', { nota: params.nota });
}
