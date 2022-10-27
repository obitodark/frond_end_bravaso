import { API_URL } from '../api';

export const SignIn = async (user) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    const status = response.status;
    return { data, status };
};

export const getUser = async (id) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    });
    const data = await response.json();

    return { data };
};

export const SignUp = async (user) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
};

export const isAuthUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const payload = token.split('.')[1];

    const jsonPayload = JSON.parse(window.atob(payload));

    if (jsonPayload.exp > new Date() / 1000 && jsonPayload.rol === 1) {
        // console.log(jsonPayload);
        return true;
    }

    return false;
};

export const isAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    const payload = token.split('.')[1];
    const jsonPayload = JSON.parse(window.atob(payload));

    if (jsonPayload.exp > new Date() / 1000 && jsonPayload.rol === 2) {
        // console.log(jsonPayload);
        return true;
    }

    return false;
    // const token = window.localStorage.getItem("token");
    // if (!token) {
    //   return false;
    // }
    // const payload = token.split(".")[1];
    // const jsonPayload = JSON.parse(window.atob(payload));
    // if (jsonPayload.exp > new Date() / 1000) {
    //   return true;
    // }
};

export const SignOut = () => {
    window.localStorage.removeItem('token');
    return (window.location.href = '/');
    //refreca el la pagina
};

const Auth = {
    SignIn,
    SignUp,
    isAuth,
    SignOut,
    isAuthUser
};
export default Auth;
