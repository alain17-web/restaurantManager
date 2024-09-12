import DashboardSidebar from "../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableInactive from "../../../components/dashboardComponents/dataTableInactive/DataTableInactive.tsx";
import {useEffect, useState} from "react";
import {Employee} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import NewEmployee from "../NewItemPages/newEmployee/NewEmployee.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";



const ListInactiveStaff = () => {

    const [inactives, setInactives] = useState<Employee[]>([])
    const[inactiveId, setInactiveId] = useState<number | null>(0);
    const [open,setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(0)

    useEffect(() => {
        const getInactives = async () => {
            try {
                const res = await axiosInstance.get('/employees/inactives')
                setInactives(res.data)
            } catch (error) {
                console.error('Error in getInactives', error);
            }
        }
        getInactives()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };


    const handleGetInactiveId = (id: number) => {
        setInactiveId(id)
        setOpen(true);
    }

    const show = () => {
        setInactiveId(null)
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
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Anciens employés</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableInactive getInactiveId={handleGetInactiveId} open={show} inactives={inactives}/> : <NewEmployee id={inactiveId} employees={inactives} onAddOrEdit={handleAddedOrEdited} close={close} user={username}/>
                }
            </div>
        </div>
    );
};
export default ListInactiveStaff;