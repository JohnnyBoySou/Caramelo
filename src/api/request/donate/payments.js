import axios from 'axios';
import { getToken } from '@hooks/token';
import getBaseURL from '@hooks/urls';

async function postData(endpoint, data) {
    const BASE_URL = await getBaseURL();
    const token = await getToken();

    try {
        const res = await axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error(error);
        console.log(error.request)
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

export async function payPix(value) {
    return await postData('/usuarios/criadoacaopix', {
        'IDinstituicao': 16,
        'valor': value,
    });
}

export async function payBoleto(params) {
    return await postData('/usuarios/criadoacaoboleto', {
        'IDinstituicao': 16,
        'valor': value,
    });
}

export async function getStatusPay(transacao) {
    return await postData('/usuarios/getstatus', {
        'IDtransacao': transacao,
    });
}

export async function payCredito(params) {
    console.log(params)
    const { value, nome, cvv, meseano, numerocartao } = params;
    return await postData('/usuarios/criadoacaocartao', {
        "nome": nome,
        "numerocartao": numerocartao,
        "cvv": cvv,
        "mes": meseano.slice(0, 2),
        "ano": meseano.slice(3, 5),
        "valor": value,
        "IDinstituicao": 16,
    });
}

export async function getPaySingle(id) {
    return await postData('/usuarios/getdadospixboleto', {
        'iddoacao': id,
    });
}
