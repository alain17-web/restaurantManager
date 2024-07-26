import {purchaseColumns} from "../../dataTable.ts";
import {DataGrid,GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import {DataTableDeliveredPurchaseData, Purchase} from "../../types/types.ts";


const DataTableDeliveredPurchases = (props:DataTableDeliveredPurchaseData) => {

    const [deliveredPurchases, setDeliveredPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        setDeliveredPurchases(props.deliveredPurchases)
    }, [props.deliveredPurchases]);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const actionColumn: GridColDef[] = [{
        field: "action",
        headerName: "",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <div className={"flex items-center mt-3"}>
                    <div
                        className={"py-[2px] px-[5px] mr-2 text-[00008B] border-[1px] border-gray-200 rounded-md cursor-pointer"}
                        onClick={() => props.getPurchaseId(params.row.purchase_id)} data-bs-toggle="tooltip"
                        data-bs-placement="top" title="VOIR DETAIL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }]


    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={deliveredPurchases}
                getRowId={() => crypto.randomUUID()}
                columns={ purchaseColumns.concat(actionColumn) }
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableDeliveredPurchases;