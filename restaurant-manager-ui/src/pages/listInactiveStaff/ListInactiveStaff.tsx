import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableInactive from "../../components/dataTableInactive/DataTableInactive.tsx";
import {useEffect, useState} from "react";
import {Employee} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import NewEmployee from "../newEmployee/NewEmployee.tsx";



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


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Anciens employés</h1>
                {!open ? <DataTableInactive getInactiveId={handleGetInactiveId} open={show} inactives={inactives}/> : <NewEmployee id={inactiveId} setEmployeeId={setInactiveId} employees={inactives} onAddOrEdit={handleAddedOrEdited} close={close}/>
                }
            </div>
        </div>
    );
};
export default ListInactiveStaff;