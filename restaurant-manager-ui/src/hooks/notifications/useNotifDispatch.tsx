import {useContext} from "react";
import {NotifDispatchContext} from "../../context/notifContext/NotifContext.tsx";

// Custom hook to access the dispatch function from the NotifDispatchContext
export const useNotifDispatch = () => {
    // Accessing the NotifDispatchContext using the useContext hook
    const context = useContext(NotifDispatchContext);

    // If the context is undefined, it means this hook is being used outside of a NotifProvider
    if (context === undefined) {
        throw new Error('useNotifDispatch must be used within a NotifProvider');
    }
    // Return the dispatch function to be used in components
    return context;
};