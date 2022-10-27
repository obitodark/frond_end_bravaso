import { API_URL } from '../api';

// const token = localStorage.getItem('token');

// const listCategory = async () => {
//     try {
//         const response = await fetch(`${API_URL}/categories`, {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         const { data } = await response.json();

//         return data;
//     } catch (error) {
//         return error;
//     }
// };

const updateImagesProduct = async (id, data) => {
    try {
        await fetch(`${API_URL}/product-images/${id}`, {
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

// const createCategory = async (data) => {
//     try {
//         const response = await fetch(`${API_URL}/categories`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify(data)
//         });
//         const datas = await response.json();
//         return datas;
//     } catch (error) {
//         return error;
//     }
// };

const deleteImagesProduct = async (id) => {
    try {
        await fetch(`${API_URL}/product-images/${id}`, {
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

const ImagesProductServices = {
    updateImagesProduct,
    deleteImagesProduct
};
export default ImagesProductServices;
