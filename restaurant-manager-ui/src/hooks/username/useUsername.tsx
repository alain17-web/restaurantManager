import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from "../../types/types.ts";



const useUsername = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        } else {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUsername(decodedToken.username.toLowerCase());
        }
    }, []);

    return { username };
};

export default useUsername;
