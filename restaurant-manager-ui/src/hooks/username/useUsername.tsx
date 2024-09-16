import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from "../../types/types.ts";


// Custom hook to retrieve the user's information (username, gender, role ID) from the JWT token
const useUsername = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null);

    // useEffect hook to decode and extract data from the JWT token when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        } else {
            // If a token is found, decode it to extract user information
            const decodedToken = jwtDecode<DecodedToken>(token);

            setUsername(decodedToken.username.toLowerCase());
            setGender(decodedToken.gender)
            setRoleId(decodedToken.role_id)
        }
    }, []);

    return { username,gender,roleId };
};

export default useUsername;
