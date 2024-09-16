import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authReducer, initialState } from './AuthReducer.tsx';
import {AuthAction, AuthState} from "../../types/types.ts";

// Creating the AuthContext to hold authentication state and dispatch functions
const AuthContext = createContext<{
    state: AuthState; // Holds the current authentication state
    dispatch: React.Dispatch<AuthAction>; // Function to dispatch actions to update state
} | undefined>(undefined); // Initial value is undefined to enforce the use of AuthProvider

// AuthProvider component that will wrap the application and provide authentication context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Using `useReducer` to manage the authentication state using the authReducer function
    const [state, dispatch] = useReducer(authReducer, {
        ...initialState, // Start with initial state
        // Checking for existing token in cookies or localStorage
        token: Cookies.get('token') || localStorage.getItem('token') || null,
    });

    // useEffect hook to synchronize the token between cookies, localStorage, and the state
    useEffect(() => {
        // If there is a token in the state, store it in both cookies and localStorage
        if (state.token) {
            Cookies.set('token', state.token, { expires: 1 }); // Expires in 1 day
            localStorage.setItem('token',state.token)
        } else {
            // If no token, remove it from both cookies and localStorage
            Cookies.remove('token');
            localStorage.removeItem('token');
        }
    }, [state.token]); // Runs every time `state.token` changes

    //Provide the `state` and `dispatch` functions to all children components
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext. Ensures it is used within an `AuthProvider`.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};