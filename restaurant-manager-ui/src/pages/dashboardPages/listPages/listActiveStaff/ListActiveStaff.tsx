import DashboardSidebar from "../../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableActive from "../../../../components/dashboardComponents/dataTableActive/DataTableActive.tsx";
import {useEffect, useState} from "react";
import NewEmployee from "../../newItemPages/newEmployee/NewEmployee.tsx";
import {Employee} from "../../../../types/types.ts";
import axiosInstance from "../../../../axios/axiosInstance.tsx";
import useUsername from "../../../../hooks/username/useUsername.tsx";


const ListActiveStaff = () => {

    // State to store the list of employees
    const [employees, setEmployees] = useState<Employee[]>([])
    // State to manage the currently selected employee's ID (for editing)
    const[employeeId, setEmployeeId] = useState<number | null>(0);
    // State to manage whether the "NewEmployee" form is open or closed
    const [open,setOpen] = useState<boolean>(false);
    // State to trigger a refetch of employee data when an employee is added or edited
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    // useEffect to fetch employee data when the component mounts or when refetchTrigger changes
    useEffect(() => {
        const getEmployees = async () => {
            try {
                // Making GET request to fetch the list of employees
                const res = await axiosInstance.get('/employees/')
                setEmployees(res.data)
            } catch (error) {
                console.error('Error in getEmployees', error);
            }
        }
        getEmployees()
    }, [refetchTrigger]);

    // Function to handle when an employee is added or edited, triggering a data refetch
    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);// Increment the value of the refetch trigger to reload data
    };

    // Function to handle selecting an employee by ID, opening the edit form
    const handleGetEmployeeId = (id: number) => {
        setEmployeeId(id)
        setOpen(true);
    }

    // Function to show the NewEmployee form for adding a new employee
    const show = () => {
        setEmployeeId(null)
        setOpen(true)
    }

    // Function to close the NewEmployee form
    const close = () => {
        setOpen(false);
    }

    // Using the useUsername hook to get the current username
    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Employés</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}

                {/* Conditionally render either the data table or the NewEmployee form based on the open state */}

                {!open ?
                    // Display the employee data table if the form is not open
                    <DataTableActive employees={employees} getEmployeeId={handleGetEmployeeId} open={show} /> :
                    // Display the NewEmployee form for adding or editing employees if open
                    <NewEmployee id={employeeId}  employees={employees} onAddOrEdit={handleAddedOrEdited} close={close} user={username}/>}
            </div>
        </div>
    );
};
export default ListActiveStaff;

