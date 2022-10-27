import { API_URL } from '../api';

// const token = localStorage.getItem('token');

const listSubCategory = async () => {
    const response = await fetch(`${API_URL}/subcategories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const { data } = await response.json();

    return data;
};

const updateSubCategory = async (id, data) => {
    // console.log('datos a actulizar', data);
    const response = await fetch(`${API_URL}/subcategories/${id}`, {
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

const createSubCategory = async (data) => {
    const response = await fetch(`${API_URL}/subcategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
    const datas = await response.json();
    return datas;
};

const deleteSubcategory = async (id) => {
    const response = await fetch(`${API_URL}/subcategories/${id}`, {
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

const SubCategory = {
    listSubCategory,
    updateSubCategory,
    createSubCategory,
    deleteSubcategory
};
export default SubCategory;
