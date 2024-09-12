import DashboardSidebar from "../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableActive from "../../../components/dashboardComponents/dataTableActive/DataTableActive.tsx";
import {useEffect, useState} from "react";
import NewEmployee from "../NewItemPages/newEmployee/NewEmployee.tsx";
import {Employee} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";


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

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Employés</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableActive employees={employees} getEmployeeId={handleGetEmployeeId} open={show} /> :
                    <NewEmployee id={employeeId}  employees={employees} onAddOrEdit={handleAddedOrEdited} close={close} user={username}/>}
            </div>
        </div>
    );
};
export default ListActiveStaff;

