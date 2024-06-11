import {roles as roleData} from "../../tempData.ts";
import {useEffect, useState} from "react";
import {Role} from "../../types/types.ts";

const RoleOption = () => {

    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        getRoles()
    }, []);

    const getRoles = () => {
        setRoles(roleData);
    }
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