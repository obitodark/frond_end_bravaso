import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listUser = async () => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const { results } = await response.json();

    return results;
};

const updateUser = async (id, data) => {
    // console.log('datos a actulizar', data);
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
    const datas = await response.json();

    return datas;
};
const validateUsername = async (username) => {
    const response = await fetch(`${API_URL}/users/username/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.status;
};

const validateDni = async (dni) => {
    const response = await fetch(`${API_URL}/users/dni/${dni}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.status;
};
const validateEmail = async (email) => {
    const response = await fetch(`${API_URL}/users/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.status;
};

const createUser = async (data) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const datas = await response.json();
    return datas;
};

const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const datas = await response.json();

    return datas;
};

const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const { data } = await response.json();

    return data;
};

const User = {
    listUser,
    updateUser,
    getUserById,
    createUser,
    deleteUser,
    validateUsername,
    validateEmail,
    validateDni
};
export default User;
