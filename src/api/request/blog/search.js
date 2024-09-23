import axios from "axios";
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export async function getSearch(query) {
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    try {
        const response = await axios.post(`${BASE_URL}/usuarios/busca/geral`, {
            busca: query,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = {
            shop: response.data.estabelecimentos.data,
            service: response.data.servicos.data,
            ongs: response.data.instituicao.data,
        }
        return res
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}