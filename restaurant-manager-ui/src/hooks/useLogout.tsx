import {useNavigate} from "react-router-dom"
import useLogoutService from "./useLogoutService.tsx";
import {LogoutService} from "../types/types.ts";

const useLogout = () => {
    const navigate = useNavigate();
    const {logout} = useLogoutService() as LogoutService; ;

    const handleLogout = async () => {
        const result = await logout()
        if(result.success){
            navigate("/connexion")
        } else {
            console.error("déconnexion échouée")
        }
    }
    return {handleLogout}
}

export default useLogout