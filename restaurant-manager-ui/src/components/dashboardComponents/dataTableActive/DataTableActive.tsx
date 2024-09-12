import {employeeColumns} from "../../../dataTable.ts";
import {DataGrid, GridRenderCellParams,GridColDef} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import { DataTableEmployeeData,Employee} from "../../../types/types.ts";


const DataTableActive = (props:DataTableEmployeeData) => {

    const [employees, setEmployees] = useState<Employee[]>([])

    // useEffect hook to update employees state whenever props.employees changes
    useEffect(() => {
        setEmployees(props.employees)
    }, [props.employees]);

    // State to handle pagination, including current page and page size
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


    // Defining an action column that contains buttons for editing employee details
    const actionColumn: GridColDef[] = [{
        field: "action", // Name of the field for the column
        headerName: "",  // No header name for this column, it's just for actions
        width: 80,       // Width of the column

        // Function to render the custom cell content (edit button)
        renderCell: (params: GridRenderCellParams) => {
            return (
                <div className={"flex items-center mt-3"}>
                    <div
                        className={"py-[2px] px-[5px] text-[00008B] border-[1px] border-gray-200 rounded-md cursor-pointer"}
                        // Calls the parent function to handle the employee ID
                        onClick={() => props.getEmployeeId(params.row.id)} data-bs-toggle="tooltip"
                        data-bs-placement="top" title="VOIR DETAIL OU MODIFIER">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffa500"
                             className="bi bi-pencil-fill cursor-pointer" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }]

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    onClick={props.open}
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF] p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter un employé
                </button>
            </div>
            {/* Data grid displaying the employees */}
            <DataGrid
                rows={employees} // Employee data passed as rows
                columns={employeeColumns.concat(actionColumn)} // Merges the predefined columns with the action column
                paginationModel={paginationModel}// Pagination model state
                onPaginationModelChange={setPaginationModel} // Updates the pagination model when page or page size changes
                pageSizeOptions={[10]} // Options for the number of rows per page
            />
        </div>
    );
};
export default DataTableActive;