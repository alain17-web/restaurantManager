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
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

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
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };



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
                    <NewRole roles={roles} id={roleId} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListRoles;