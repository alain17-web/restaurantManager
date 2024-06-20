import {useEffect, useState} from "react";
import {Role} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";

const RoleOption = () => {

    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const res = await axiosInstance.get('/roles/')
                setRoles(res.data)
            } catch (error) {
                console.error('Error in getRoles', error);
            }
        }
        getRoles()
    }, []);
    return (
        <>
            <option>Choisir un rôle</option>
            {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.role_name}</option>
            ))}
        </>
    );
};
export default RoleOption;