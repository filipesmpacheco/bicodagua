import { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((email, password) => {
        // Mock authentication check
        if (email === 'bernardino@teste.com' && password === '12345678') {
            setUser({ email, name: 'Bernardino' });
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
