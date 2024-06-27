import React, {createContext, useReducer, useMemo, Dispatch, ReactNode, useEffect} from 'react';
import { notifReducer,initialState} from "./NotifReducer.tsx";
import {NotifAction, NotifState} from "../../types/types.ts";

type NotifDispatch = Dispatch<NotifAction>;

interface NotifProviderProps {
    children: ReactNode;
}

export const NotifStateContext = createContext<NotifState | undefined >(undefined)
export const NotifDispatchContext = createContext<NotifDispatch | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'notifState';

const loadState = ():NotifState => {
    try{
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        return serializedState ? JSON.parse(serializedState) : initialState;
    }catch(error){
        console.warn('Could not load state to localStorage',error);
        return  initialState;
    }
}

const saveState = (state:NotifState) => {
    try{
       const serializedState = JSON.stringify(state);
       localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    }catch(error){
        console.warn('Could not save state to localStorage',error);
    }
}

export const NotifProvider:React.FC<NotifProviderProps> = ({children}) => {
    const [state,dispatch] = useReducer(notifReducer,loadState())

    useEffect(() => {
        saveState(state)
    }, [state]);

    const memoizedState = useMemo(() => state, [state])
    const memoizedDispatch = useMemo(() => dispatch, [dispatch])

    return (
        <NotifStateContext.Provider value={memoizedState}>
            <NotifDispatchContext.Provider value={memoizedDispatch}>
                {children}
            </NotifDispatchContext.Provider>
        </NotifStateContext.Provider>
    )
}



