import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableActive from "../../components/dataTableActive/DataTableActive.tsx";
import {useEffect, useState} from "react";
import NewEmployee from "../newEmployee/NewEmployee.tsx";
import {Employee} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const ListActiveStaff = () => {

    const [employees, setEmployees] = useState<Employee[]>([])
    const[employeeId, setEmployeeId] = useState<number | null>(0);
    const [open,setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const res = await axiosInstance.get('/employees/')
                setEmployees(res.data)
            } catch (error) {
                console.error('Error in getEmployees', error);
            }
        }
        getEmployees()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    const handleGetEmployeeId = (id: number) => {
        setEmployeeId(id)
        setOpen(true);
    }

    const show = () => {
        setEmployeeId(null)
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
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Employés</h1>
                {!open ? <DataTableActive employees={employees} getEmployeeId={handleGetEmployeeId} open={show} /> : <NewEmployee id={employeeId} setEmployeeId={setEmployeeId} employees={employees} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListActiveStaff;

