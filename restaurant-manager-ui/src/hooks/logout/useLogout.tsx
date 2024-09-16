import {useNavigate} from "react-router-dom"
import useLogoutService from "./useLogoutService.tsx";
import {LogoutService} from "../../types/types.ts";
import {useAuth} from "../../context/authContext/AuthContext.tsx";
import useUsername from "../username/useUsername.tsx";

const useLogout = () => {
    const navigate = useNavigate();
    const {logout} = useLogoutService() as LogoutService;
    const {dispatch} = useAuth()
    const {username} = useUsername()

    const handleLogout = async () => {
        const result = await logout()
        if(result.success){
            dispatch({type:'LOGOUT'})
            localStorage.removeItem('token')
            navigate(username === "guest" ? "/loginGuest" : "/connexion")
        } else {
            console.error("déconnexion échouée")
        }
    }
    return {handleLogout}
}

export default useLogout