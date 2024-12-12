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

async function postData(endpoint, data,) {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
        return response.data
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
    return await postData('/usuarios/postarcomentario', { texto: message, idpost: id, });
}

export async function listComments(id) {
    return await postData(`/usuarios/comentarios/getall`, { idpost: id, });
}

export async function excludeComment(comment_id, post_id) {
    return await postData('/usuarios/deletarcomentario', { idcomentario: comment_id, idpost: post_id, });
}

export async function editComment(comment_id, post_id, message) {
    return await postData('/usuarios/editarcomentario', { idcomentario: comment_id, idpost: post_id, texto: message, });
}

export async function listPosts() {

    /*   
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` }
    const fields = "media_url,media_type,caption,permalink,thumbnail_url,timestamp,username";
    */

    try {
        const res = await axios.get("https://rss.app/feeds/v1.1/3vuvvKZD3r9IdSTw.json");
        return res.data.items

        //const response = await axios.get(`${BASE_URL}/usuarios/gettokeninstagram`, { headers });
      //  const tokenInsta = response.data.token;
       // const res = await axios.get(`https://graph.instagram.com/me/media?access_token=${tokenInsta}&fields=${fields}`)
       // return res.data
    } catch (error) {
        console.error(error);
    }
}

export async function toggleLike(id) {
    return await postData('/usuarios/curtirdescurtir', { idpost: id });
}

export async function isLike(id) {
    return await postData('/usuarios/iscurtir', { idpost: id });
}
