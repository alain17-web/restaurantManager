import {formerEmployees as formerEmployeeData} from "../../tempData.ts";
import {inactiveColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface ExEmployee {
    id: number
    username: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    status: string;
}

const DataTableInactive = () => {

    const [formerEmployees,setFormerEmployees] = useState<ExEmployee[]>([])

    useEffect(() => {
        getFormerEmployees()
    }, []);

    const getFormerEmployees = () => {
        setFormerEmployees(formerEmployeeData)
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={formerEmployees}
                columns={inactiveColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableInactive