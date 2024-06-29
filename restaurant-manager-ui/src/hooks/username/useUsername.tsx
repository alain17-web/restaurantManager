import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from "../../types/types.ts";



const useUsername = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        } else {
            const decodedToken = jwtDecode<DecodedToken>(token);

            setUsername(decodedToken.username.toLowerCase());
            setGender(decodedToken.gender)
            setRoleId(decodedToken.role_id)
        }
    }, []);

    return { username,gender,roleId };
};

export default useUsername;
