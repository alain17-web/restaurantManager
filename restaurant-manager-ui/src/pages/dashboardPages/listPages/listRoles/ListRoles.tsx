import DashboardSidebar from "../../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import {useState, useEffect} from "react";
import {Role} from "../../../../types/types.ts";
import DataTableRoles from "../../../../components/dashboardComponents/dataTableRoles/DataTableRoles.tsx";
import NewRole from "../../newItemPages/newRole/NewRole.tsx";
import axiosInstance from "../../../../axios/axiosInstance.tsx";
import useUsername from "../../../../hooks/username/useUsername.tsx";

//See comments on ListActiveStaff to understand logic
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

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Rôles</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableRoles roles={roles} getRoleId={handleGetRoleId} open={show}/> :
                    <NewRole roles={roles} id={roleId} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListRoles;