import React, { createContext, useContext, useState } from 'react';

import { API_BASE_URL } from '../config';

interface User {
    id: string;
    full_name: string;
    email: string;
    role: 'user' | 'builder' | 'admin' | 'buyer' | 'owner' | 'authorized_seller' | 'reviewer';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credential: string) => Promise<void>;
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('dwell_user');
        return savedUser ? JSON.parse(savedUser) as User : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('dwell_token'));

    const login = async (credential: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const { user: userData, access_token, refresh_token } = data;

            setUser(userData);
            setToken(access_token);

            localStorage.setItem('dwell_user', JSON.stringify(userData));
            localStorage.setItem('dwell_token', access_token);
            localStorage.setItem('dwell_refresh_token', refresh_token);

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('dwell_user');
        localStorage.removeItem('dwell_token');
        localStorage.removeItem('dwell_refresh_token');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
