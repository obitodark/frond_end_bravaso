import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listBrand = async () => {
    const response = await fetch(`${API_URL}/brands`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const { data } = await response.json();

    return data;
};

const updateBrands = async (id, data) => {
    try {
        await fetch(`${API_URL}/brands/${id}`, {
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

const createBrands = async (data) => {
    try {
        await fetch(`${API_URL}/brands`, {
            method: 'POST',
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

const deleteBrands = async (id) => {
    try {
        await fetch(`${API_URL}/brands/${id}`, {
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

const BrandServices = {
    listBrand,
    updateBrands,
    createBrands,
    deleteBrands
};
export default BrandServices;
