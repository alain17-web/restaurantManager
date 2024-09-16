
import React, { createContext, useReducer, useMemo, Dispatch, ReactNode, useEffect } from 'react';
import { notifReducer, initialState } from "./NotifReducer.tsx";
import { NotifAction, NotifState } from "../../types/types.ts";

// Type alias for the dispatch function that will handle NotifAction
type NotifDispatch = Dispatch<NotifAction>;

// Props for the NotifProvider component, which wraps children
interface NotifProviderProps {
    children: ReactNode;
}

// Creating two contexts: one for the state and one for the dispatch function
export const NotifStateContext = createContext<NotifState | undefined>(undefined);
export const NotifDispatchContext = createContext<NotifDispatch | undefined>(undefined);

// Key for storing notifications state in localStorage
const LOCAL_STORAGE_KEY = 'notifState';

// Function to load the saved state from localStorage
const loadState = (): NotifState => {
    try {
        // Attempt to load and parse the state from localStorage
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        // If no state found, return initialState
        return serializedState ? JSON.parse(serializedState) : initialState;
    } catch (error) {
        console.warn('Could not load state from localStorage', error);
        return initialState; // Return initialState if there's an error
    }
};

// Function to save the current state to localStorage
const saveState = (state: NotifState) => {
    try {
        // Serialize and store the state in localStorage
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (error) {
        console.warn('Could not save state to localStorage', error);
    }
};

// NotifProvider component to provide notification state and dispatch to children
export const NotifProvider: React.FC<NotifProviderProps> = ({ children }) => {
    // useReducer hook to manage notification state using notifReducer and initial state from localStorage
    const [state, dispatch] = useReducer(notifReducer, loadState());

    // useEffect to save the updated state to localStorage whenever the state changes
    useEffect(() => {
        saveState(state);
    }, [state]); // Dependency array ensures effect runs on state changes

    // useMemo to memoize state and dispatch, ensuring they don’t change unnecessarily
    const memoizedState = useMemo(() => state, [state]);
    const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

    return (
        // Providing the memoized state and dispatch to all children components
        <NotifStateContext.Provider value={memoizedState}>
            <NotifDispatchContext.Provider value={memoizedDispatch}>
                {children}
            </NotifDispatchContext.Provider>
        </NotifStateContext.Provider>
    );
};
