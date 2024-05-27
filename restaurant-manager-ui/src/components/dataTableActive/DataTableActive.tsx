import {employees as employeeData} from "../../tempData.ts";
import {employeeColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface Employee {
    id: number
    username: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    status: string;
}

interface Props{
    open:() => void
}

const DataTableActive = (props:Props) => {

    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        getEmployees()
    }, []);

    const getEmployees = () => {
        setEmployees(employeeData)
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    onClick={props.open}
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF] p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter un employé
                </button>
            </div>
            <DataGrid
                rows={employees}
                columns={employeeColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableActive;