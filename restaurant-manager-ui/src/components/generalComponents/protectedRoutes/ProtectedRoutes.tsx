import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken, ProtectedRouteProps} from "../../../types/types.ts";



const ProtectedRoutes = ({ rolesAllowed, children }: ProtectedRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');


        if (!token) {
            console.log('No token found, setting isAuthorized to false');
            setIsAuthorized(false);
            return;
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);

            const authorized = rolesAllowed.includes(decodedToken.role_id)

            setIsAuthorized(authorized);

        } catch (error) {
            console.error('Error decoding token or insufficient permissions:', error);
            setIsAuthorized(false);
        }
    }, [rolesAllowed]);

    if (!isAuthorized) {
        console.log('User not authorized, redirecting to login');
        navigate('/connexion');
    } else {
        return <>{children}</>;
    }


};

export default ProtectedRoutes;
