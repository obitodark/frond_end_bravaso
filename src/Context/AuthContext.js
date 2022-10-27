import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../api';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const [adminTitle, setAdminTitle] = useState("Products");
    const [authentication, setAuthentication] = useState({
        isAuthenticated: null,
        isLoading: false,
        isError: false,
        errorMessage: '',
        successMessage: '',
        user: {}
    });

    return (
        <AuthContext.Provider
            value={{
                authentication,
                setAuthentication
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
