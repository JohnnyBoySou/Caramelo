import axios from 'axios';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

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

export async function sendNotafiscal(params) {
    const token = await getToken();
    const { id, notas } = params;
    return await postData('/usuarios/doar/nota', { instituicao_id: id, notas }, token);
}

export async function sendNotafiscalAnonima(params) {
    const { id, notas } = params;
    return await postData('/usuarios/doar/variasanonima', { instituicao_id: id, notas, });
}

export async function verifyNota(params) {
    return await postData('/usuarios/validar/nota', { nota: params.nota });
}
