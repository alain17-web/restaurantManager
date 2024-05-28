import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableActive from "../../components/dataTableActive/DataTableActive.tsx";
import {useEffect, useState} from "react";
import NewEmployee from "../newEmployee/NewEmployee.tsx";
import {employees as employeeData} from "../../tempData.ts";

interface Employee {
    id: number
    username: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    status: string;
}

const ListActiveStaff = () => {

    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        getEmployees()
    }, []);

    const getEmployees = () => {
        setEmployees(employeeData)
    }

    const[employeeId, setEmployeeId] = useState<number>(0);
    const [open,setOpen] = useState<boolean>(false);

    const handleGetEmployeeId = (id: number) => {
        setEmployeeId(id)
        setOpen(true);
    }

    const show = () => {
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
                {!open ? <DataTableActive getEmployeeId={handleGetEmployeeId} open={show} /> : <NewEmployee id={employeeId} setEmployeeId={setEmployeeId} />}
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
export default ListActiveStaff;

