import axios from "axios";
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export async function getListCategory() {
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
        const response = await axios.get(`${BASE_URL}/usuarios/categorias`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export async function getSingleCategory(id) {
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
        const response = await axios.get(`${BASE_URL}/usuarios/estabelecimentos/categoria/${id}`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}