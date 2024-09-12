import {useEffect, useState} from "react";
import {Role} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";

const RoleOption = () => {

    const [roles, setRoles] = useState<Role[]>([]);

    // useEffect hook to fetch roles when the component mounts
    useEffect(() => {
        const getRoles = async () => {
            try {
                // Sending a GET request to retrieve the list of roles
                const res = await axiosInstance.get('/roles/')

                // Updating the state with the fetched roles data
                setRoles(res.data)
            } catch (error) {
                console.error('Error in getRoles', error);
            }
        }
        getRoles()
    }, []);  // Empty dependency array ensures this effect runs only once, on component mount

    return (
        <>
            <option>Choisir un rôle</option>
            {/* Mapping over the fetched roles and rendering an option for each role */}
            {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.role_name}</option>
            ))}
        </>
    );
};
export default RoleOption;