import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    full_name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (googleData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('dwell_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (googleData: any) => {
        try {
            const response = await fetch('http://localhost:8000/auth/google/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    google_id: 'google-' + Math.random().toString(36).substr(2, 6), // Mocking Google response ID
                    email: googleData.email,
                    name: googleData.name
                })
            });
            const data = await response.json();
            const authenticatedUser = {
                id: data.user.id,
                full_name: data.user.full_name,
                email: data.user.email
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
