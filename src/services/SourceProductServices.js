import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listSourceProduct = async () => {
    try {
        const response = await fetch(`${API_URL}/source-products`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const { data } = await response.json();

        return data;
    } catch (error) {
        return error;
    }
};

const updateSourceProduct = async (id, data) => {
    try {
        await fetch(`${API_URL}/source-products/${id}`, {
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

const createSourceProduct = async (data) => {
    try {
        const response = await fetch(`${API_URL}/source-products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        const datas = await response.json();
        return datas;
    } catch (error) {
        return error;
    }
};

const deleteSourceProduct = async (id) => {
    try {
        await fetch(`${API_URL}/source-products/${id}`, {
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

const SourceProductServices = {
    listSourceProduct,
    updateSourceProduct,
    createSourceProduct,
    deleteSourceProduct
};
export default SourceProductServices;
