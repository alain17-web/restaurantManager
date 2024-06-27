import {useContext} from "react";
import {NotifDispatchContext} from "../../context/notifContext/NotifContext.tsx";

export const useNotifDispatch = () => {
    const context = useContext(NotifDispatchContext);
    if (context === undefined) {
        throw new Error('useNotifDispatch must be used within a NotifProvider');
    }
    return context;
};