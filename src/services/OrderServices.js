import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const createOrdern = async () => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

const OrderServices = {
    createOrdern
};
export default OrderServices;
