import {useContext} from "react";
import {NotifStateContext} from "../../context/notifContext/NotifContext.tsx";

// Custom hook to access the current notification state from NotifStateContext
export const useNotifState = () => {
    // Accessing the NotifStateContext using the useContext hook
    const context = useContext(NotifStateContext);

    // If the context is undefined, it means this hook is being used outside of a NotifProvider
    if (context === undefined) {
        throw new Error('useNotifState must be used within a NotifProvider');
    }
    return context;
};