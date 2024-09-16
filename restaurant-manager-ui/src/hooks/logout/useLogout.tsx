import {useNavigate} from "react-router-dom"
import useLogoutService from "./useLogoutService.tsx";
import {LogoutService} from "../../types/types.ts";
import {useAuth} from "../../context/authContext/AuthContext.tsx";
import useUsername from "../username/useUsername.tsx";

const useLogout = () => {
    // `useNavigate` hook is used to programmatically navigate to a different route
    const navigate = useNavigate();

    //`useLogoutService` hook provides the `logout` function for making the logout request
    const {logout} = useLogoutService() as LogoutService;

    // Accessing the dispatch function from the authentication context to update the auth state
    const {dispatch} = useAuth()

    // Accessing the username via the `useUsername` hook
    const {username} = useUsername()

    const handleLogout = async () => {
        // Calling the `logout` function from the logout service, which makes the request to logout
        const result = await logout()

        if(result.success){
            // Dispatching the LOGOUT action to update the auth context (clear token and user data)
            dispatch({type:'LOGOUT'})

            // Removing the token from localStorage upon successful logout
            localStorage.removeItem('token')

            // Redirecting the user based on their username:
            // - If it's a guest user, navigate to "/loginGuest"
            // - Otherwise, navigate to the "/connexion" (login) page
            navigate(username === "guest" ? "/loginGuest" : "/connexion")
        } else {
            console.error("déconnexion échouée")
        }
    }
    return {handleLogout}
}

export default useLogout