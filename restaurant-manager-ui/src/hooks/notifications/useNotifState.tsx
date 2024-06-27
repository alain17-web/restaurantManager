import {useContext} from "react";
import {NotifStateContext} from "../../context/notifContext/NotifContext.tsx";

export const useNotifState = () => {
    const context = useContext(NotifStateContext);
    if (context === undefined) {
        throw new Error('useNotifState must be used within a NotifProvider');
    }
    return context;
};