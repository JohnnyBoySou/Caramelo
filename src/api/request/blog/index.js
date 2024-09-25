import axios from 'axios';
import { getToken } from '@hooks/token';
import getBaseURL from '@hooks/urls';

async function getData(endpoint,) {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, { headers });
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


export async function publishComment(message, id) {
    return await postData('/usuarios/comentarios',{ message: message, comment_id: id, });
}

export async function listComments(id) {
    return await getData(`/usuarios/comentarios/${id}`);
}

export async function excludeComment(comment_id) {
    return await postData('/usuarios/comentarios', { comment_id: comment_id });
}
