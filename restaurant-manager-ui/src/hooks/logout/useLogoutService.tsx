import axios from "axios";
import {LogoutService} from "../../types/types.ts";

// Defining the custom hook `useLogoutService` which returns the `logout` function
const useLogoutService : () => LogoutService = () => {

    const logout = async (): Promise<{ success: boolean; message: string }> => {
        try {
            // Sending a POST request to the backend API to log the user out
            // `withCredentials: true` ensures that cookies (for authentication) are included in the request
            await axios.post('http://localhost:3000/api/auth/logout', {

            },{withCredentials:true})
            return { success: true, message: 'Logout successful' }
        } catch (error) {
            console.error('Logout failed',error)
            return { success: false, message: 'Logout failed' };
        }
    }
    // Returning the `logout` function, which can be used in other components
    return {logout};
}
export default useLogoutService;