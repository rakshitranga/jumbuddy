import axios from 'axios';

export const createItem = async () => {
    const response = await axios.post(`${API_URL}/items`, data);
    return response.data;
};