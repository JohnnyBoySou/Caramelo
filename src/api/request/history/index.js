import axios from 'axios';
import { getToken } from '@hooks/token';
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
        console.log(error.request)
        let errMsg;

        if (error.response) {
            const err = error.response.data;
            errMsg = err?.message || 'Erro inesperado no servidor';
        } else if (error.request) {
            // A solicitação foi feita, mas não houve resposta
            errMsg = 'Sem resposta do servidor. Verifique sua conexão.';
        } else {
            errMsg = error.message;
        }

        throw new Error(errMsg);
    }
}

export async function listDonate() {
    console.log('listar doacoes')
    return await fetchData('/usuarios/doacoes');
}
export async function listNotas() {
    console.log('listar notas')
    return await fetchData('/usuarios/notas');
}

export async function singleExtract(id, type) {
    const path = type === 'Nota fiscal' ? `/usuarios/notas/single/${id}` :
        type === 'Doação' ? `/usuarios/doacoes/single/${id}` : null;
    if (!path) throw new Error('Invalid type provided');
    return await fetchData(path);
}
