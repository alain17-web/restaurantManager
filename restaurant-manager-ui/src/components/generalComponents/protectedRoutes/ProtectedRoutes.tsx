
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT tokens
import { DecodedToken, ProtectedRouteProps } from "../../../types/types.ts";

// Define the ProtectedRoutes component, which accepts rolesAllowed and children as props
const ProtectedRoutes = ({ rolesAllowed, children }: ProtectedRouteProps) => {

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const navigate = useNavigate();

    // useEffect to run when the component mounts or when rolesAllowed changes
    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // If no token is found, set isAuthorized to false and exit the function
        if (!token) {
            console.log('No token found, setting isAuthorized to false');
            setIsAuthorized(false);
            return;
        }

        try {
            // Decode the JWT token to extract user information
            const decodedToken = jwtDecode<DecodedToken>(token);

            // Check if the user's role is included in the allowed roles
            const authorized = rolesAllowed.includes(decodedToken.role_id);

            // Update the isAuthorized state based on the role check
            setIsAuthorized(authorized);

        } catch (error) {
            // If there's an error (e.g., invalid token), log it and set isAuthorized to false
            console.error('Error decoding token or insufficient permissions:', error);
            setIsAuthorized(false);
        }
    }, [rolesAllowed]); // Re-run the effect whenever rolesAllowed changes

    // If the user is not authorized, redirect them to the login page
    if (!isAuthorized) {
        console.log('User not authorized, redirecting to login');
        navigate('/connexion');
    } else {
        // If the user is authorized, render the children components (i.e., protected content)
        return <>{children}</>;
    }
};


export default ProtectedRoutes;
