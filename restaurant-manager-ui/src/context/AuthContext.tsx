
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authReducer, initialState } from './AuthReducer';
import {AuthAction, AuthState} from "../types/types.ts";

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        ...initialState,
        token: Cookies.get('token') || localStorage.getItem('token') || null,
    });

    useEffect(() => {
        if (state.token) {
            Cookies.set('token', state.token, { expires: 1 });
            localStorage.setItem('token',state.token)
        } else {
            Cookies.remove('token');
            localStorage.removeItem('token');
        }
    }, [state.token]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
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

