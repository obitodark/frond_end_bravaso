import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listShoppingCart = async () => {
    const response = await fetch(`${API_URL}/shopping_carts`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();

    return data;
};

const updateShoppingCart = async (data) => {
    try {
        await fetch(`${API_URL}/shopping_carts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        return error;
    }
};

const deleteShoppingCart = async (id) => {
    try {
        await fetch(`${API_URL}/shopping_carts/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        return error;
    }
};

const ShoppingCartServices = {
    listShoppingCart,
    updateShoppingCart,
    deleteShoppingCart
};
export default ShoppingCartServices;
