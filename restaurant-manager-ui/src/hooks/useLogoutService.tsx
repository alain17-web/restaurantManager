import axios from "axios";
import {LogoutService} from "../types/types.ts";


const useLogoutService : () => LogoutService = () => {

    const logout = async (): Promise<{ success: boolean; message: string }> => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {

            },{withCredentials:true})
            return { success: true, message: 'Logout successful' }
        } catch (error) {
            console.error('Logout failed',error)
            return { success: false, message: 'Logout failed' };
        }
    }
    return {logout};
}
export default useLogoutService;