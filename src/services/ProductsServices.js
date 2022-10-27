import { API_URL } from '../api';
import Services from './BaseServices';

const path = 'products';

const listProduct = async () => {
    return await Services.getList(path);
    // const response = await fetch(`${API_URL}/products`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    // });
    // const { data } = await response.json();

    // return data;
};

const filterProduct = async (data, page = 1, per_page = 12) => {
    try {
        const response = await fetch(`${API_URL}/products/filter/${page}/${per_page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const results = await response.json();
        console.log('data', results);
        return results;
    } catch (error) {
        return error;
    }
};

const updateProduct = async (id, data) => {
    // console.log('datos a actulizar', data);
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);

    formData.append('stock', data.stock);
    formData.append('category_id', data.category_id);
    formData.append('subcategory_id', data.subcategory_id);
    formData.append('source_id', data.source_id);
    formData.append('image', data.image);
    formData.append('weight', data.weight);
    formData.append('brand_id', data.brand_id);
    formData.append('type_material_id', data.type_material_id);
    // formData.append('name', data.name);

    const response = await fetch(`${API_URL}/products/${id}`, {
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

const createProduct = async (data) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('image', data.image);
    formData.append('stock', data.stock);
    formData.append('category_id', data.category_id);
    formData.append('subcategory_id', data.subcategory_id);
    formData.append('brand_id', data.brand_id);
    formData.append('weight', data.weight);
    formData.append('source_id', data.source_id);
    formData.append('type_material_id', data.type_material_id);
    const response = await fetch(`${API_URL}/products`, {
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

const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const datas = await response.json();

    return datas;
};

// const getUserById = async (id) => {
//     const response = await fetch(`${API_URL}/users/${id}`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     });
//     const data = await response.json();

//     return data;
// };

// export const getUser = async (id) => {
//     const response = await fetch(`${API_URL}/auth/signin`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(id)
//     });
//     const data = await response.json();

//     return { data };
// };

// export const SignUp = async (user) => {
//     const response = await fetch(`${API_URL}/auth/signup`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     });
//     const data = await response.json();
//     return data;
// };

// export const isAuth = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return false;
//     }
//     const payload = token.split('.')[1];
//     const jsonPayload = JSON.parse(window.atob(payload));

//     if (jsonPayload.exp > new Date() / 1000) {
//         console.log(jsonPayload);
//         return true;
//     }

//     return false;
//     // const token = window.localStorage.getItem("token");
//     // if (!token) {
//     //   return false;
//     // }
//     // const payload = token.split(".")[1];
//     // const jsonPayload = JSON.parse(window.atob(payload));
//     // if (jsonPayload.exp > new Date() / 1000) {
//     //   return true;
//     // }
// };

// export const SignOut = () => {
//     window.localStorage.removeItem('token');
//     return (window.location.href = '/pe');
//     //refreca el la pagina
// };

const ProductsServices = {
    listProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    filterProduct
};
export default ProductsServices;
