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
    }, []);


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
                {!open ? <DataTableActive employees={employees} getEmployeeId={handleGetEmployeeId} open={show} /> : <NewEmployee id={employeeId} setEmployeeId={setEmployeeId} employees={employees} />}
                {open ?
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"mt-0 m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
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
export default ListActiveStaff;

