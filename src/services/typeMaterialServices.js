import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listTypeMaterial = async () => {
    try {
        const response = await fetch(`${API_URL}/type_material`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        const { data } = await response.json();

        return data;
    } catch (error) {
        return error;
    }
};

const updateTypeMaterial = async (id, data) => {
    try {
        await fetch(`${API_URL}/type_material/${id}`, {
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

const createTypeMaterial = async (data) => {
    try {
        const response = await fetch(`${API_URL}/type_material`, {
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

const deleteTypeMaterial = async (id) => {
    try {
        await fetch(`${API_URL}/type_material/${id}`, {
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

const TypeMaterialServices = {
    listTypeMaterial,
    updateTypeMaterial,
    createTypeMaterial,
    deleteTypeMaterial
};
export default TypeMaterialServices;
