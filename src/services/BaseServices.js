import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const getList = async (url) => {
    try {
        const response = await fetch(`${API_URL}/${url}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const { data } = await response.json();
        // console.log('data', data);
        return data;
    } catch (error) {
        return error;
    }
};

const createItem = async (url, datas) => {
    try {
        const response = await fetch(`${API_URL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(datas)
        });
        const { data } = await response.json();
        // console.log('data', data);
        return data;
    } catch (error) {
        return error;
    }
};

const deleteItem = async (url, id) => {
    try {
        await fetch(`${API_URL}/${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        return error;
    }
};

const Services = {
    getList,
    createItem,
    deleteItem
};
export default Services;
