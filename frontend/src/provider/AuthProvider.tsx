import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRegisterDTO } from "@/types/register";
import Axios from "@/utils/axios";
import { LoginFormValues } from '@/pages/auth/components/Login';
import { getLogInUser } from '@/api/auth/getLogInUser';
import { TAuth } from '@/types/auth';
import { login } from '@/api/auth/login';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext<TAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);


    const loginFn = async (payload: LoginFormValues) => {
        const res = await login(payload);
        if (res?.data) {
            const user = await loadUser();
            return user;
        }
        return null;
    }

    const logout = () => {
        return Axios.get('/auth/logout')
    }

    const loadUser = async () => {
        try {
            setLoading(true);
            const res = await getLogInUser();
            if (res?.data) {
                setUser(res?.data);
                return res?.data
            }else {
                setUser(null);
                return null;
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const isAuthRoute = location.pathname.startsWith('/auth');
        if (!isAuthRoute) loadUser();
    }, [])


    return (
        <AuthContext value={{
            loginFn,
            logoutFn: logout,
            isLoading: loading,
            user
        }}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used in AuthProvider')
    }

    return context;
}