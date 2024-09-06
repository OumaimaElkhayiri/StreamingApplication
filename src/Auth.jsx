import { createContext, useContext, useState, useEffect } from "react";

const Auth = createContext(null);

export const useAuth = () => useContext(Auth);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const saveAuthToken = (token) => {
        sessionStorage.setItem("authToken", token);
        setAuthToken(token);
    };

    const clearAuthToken = () => {
        sessionStorage.removeItem("authToken");
        setAuthToken(null);
    };

    return (
        <Auth.Provider value={{
            authToken,
            isAuthenticated: !!authToken,
            setAuthToken: saveAuthToken,
            clearAuthToken
        }}>
            {children}
        </Auth.Provider>
    );
};
