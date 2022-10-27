import { API_URL } from '../api';
import Services from './BaseServices';

const path = 'products';

// const listProduct = async () => {
//     return await Services.getList(path);
//     // const response = await fetch(`${API_URL}/products`, {
//     //     method: 'GET',
//     //     headers: {
//     //         Accept: 'application/json',
//     //         Authorization: `Bearer ${localStorage.getItem('token')}`
//     //     }
//     // });
//     // const { data } = await response.json();

//     // return data;
// };

// const filterProduct = async (data) => {
//     try {
//         const response = await fetch(`${API_URL}/products/filter`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         const results = await response.json();
//         console.log('data', results);
//         return results;
//     } catch (error) {
//         return error;
//     }
// };

const updateImages = async (data, id) => {
    // console.log('datos a actulizar', data);
    let formData = new FormData();

    formData.append('image', data);

    const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
        // redirect: 'follow'
    });
    const datas = await response.json();

    return datas;
};

const createImages = async (data, id) => {
    let formData = new FormData();

    formData.append('image', data);
    const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json'
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    const datas = await response.json();
    return datas;
};

const deleteImages = async (id) => {
    const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const datas = await response.json();

    return datas;
};

const ImagesServices = {
    createImages,
    updateImages,
    deleteImages
};
export default ImagesServices;
