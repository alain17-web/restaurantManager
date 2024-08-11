import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useState, useEffect} from "react";
import {Role} from "../../types/types.ts";
import DataTableRoles from "../../components/dataTableRoles/DataTableRoles.tsx";
import NewRole from "../newRole/NewRole.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";

const ListRoles = () => {

    const [roles, setRoles] = useState<Role[]>([]);
    const [roleId, setRoleId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

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



    const handleGetRoleId = (id: number) => {
        setRoleId(id)
        setOpen(true);
    }

    const show = () => {
        setRoleId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Rôles</h1>
                {!open ? <DataTableRoles roles={roles} getRoleId={handleGetRoleId} open={show}/> :
                    <NewRole setRoleId={setRoleId} roles={roles} id={roleId} />}
                {open ?
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                            onClick={close}
                        >
                            Retour à la liste
                        </button>
                    </div> : ""
                }
            </div>
        </div>
    );
};
export default ListRoles;