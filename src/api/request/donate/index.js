import axios from 'axios';
import { getToken } from '@hooks/token';
import getBaseURL from '@hooks/urls';


export async function sendDonation(parms) {
    const token = await getToken()
    const BASE_URL = await getBaseURL()
    console.log('fazendo doação')
    try {
        const res = await axios.post(`${BASE_URL}/donate`, parms, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}