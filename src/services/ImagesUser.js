import { API_URL } from '../api';

const updateImagesUser = async (id, data) => {
    try {
        await fetch(`${API_URL}/users-images/${id}`, {
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

// const deleteCategory = async (id) => {
//     try {
//         await fetch(`${API_URL}/categories/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 Accept: 'application/json',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//     } catch (error) {
//         return error;
//     }
// };

const ImagesUserServices = {
    updateImagesUser
};
export default ImagesUserServices;
