import React,{createContext, useReducer, useMemo, Dispatch,ReactNode} from 'react';
import { notifReducer,initialState} from "./NotifReducer.tsx";
import {NotifAction, NotifState} from "../../types/types.ts";

type NotifDispatch = Dispatch<NotifAction>;

interface NotifProviderProps {
    children: ReactNode;
}

export const NotifStateContext = createContext<NotifState | undefined >(undefined)
export const NotifDispatchContext = createContext<NotifDispatch | undefined>(undefined)

export const NotifProvider:React.FC<NotifProviderProps> = ({children}) => {
    const [state,dispatch] = useReducer(notifReducer,initialState)

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



