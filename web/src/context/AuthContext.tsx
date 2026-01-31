import React, { createContext, useContext, useState } from 'react';

interface User {
    id: string;
    full_name: string;
    email: string;
    role: 'user' | 'builder' | 'admin';
}

interface GoogleLoginData {
    email: string;
    name: string;
    role?: 'user' | 'builder' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (googleData: GoogleLoginData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('dwell_user');
        return savedUser ? JSON.parse(savedUser) as User : null;
    });

    const login = async (googleData: GoogleLoginData) => {
        try {
            // In a real app, the backend would return the user role based on their profile.
            // For this ecosystem, we'll allow role selection in the login flow for demoing.
            const authenticatedUser: User = {
                id: 'dwell-user-' + Math.random().toString(36).substr(2, 6),
                full_name: googleData.name,
                email: googleData.email,
                role: googleData.role || 'user'
            };
            setUser(authenticatedUser);
            localStorage.setItem('dwell_user', JSON.stringify(authenticatedUser));
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dwell_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
