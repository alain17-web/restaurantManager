import {purchaseColumns} from "../../dataTable.ts";
import {DataGrid,GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import {DataTablePurchaseData, Purchase} from "../../types/types.ts";
import {confirmAlert} from "react-confirm-alert";
import axiosInstance from "../../axios/axiosInstance.tsx";


const DataTablePurchases = (props:DataTablePurchaseData) => {

    const [purchases, setPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        setPurchases(props.purchases)
    }, [props.purchases]);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const handleDelete = (id:number): void => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ce réappro ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try{
                            //await axiosInstance.delete(`/purchaseItems/${purchase_id}`)
                            await axiosInstance.delete(`/purchases/${id}`)
                            setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id))
                        } catch(error){
                            console.error("deletion failed", error)
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick:  () => console.log("deletion cancelled")
                }
            ]
        })
    }

    const actionColumn: GridColDef[] = [{
        field: "action",
        headerName: "",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <div className={"flex items-center mt-3"}>
                    <div
                        className={"py-[2px] px-[5px] mr-2 text-[00008B] border-[1px] border-gray-200 rounded-md cursor-pointer"}
                        onClick={() => props.getPurchaseId(params.row.id)} data-bs-toggle="tooltip"
                        data-bs-placement="top" title="VOIR DETAIL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                    <div className={"py-[2px] px-[5px] text-[DC143C] border-[1px] border-gray-200"}
                         onClick={() => handleDelete(params.row.id)} data-bs-toggle="tooltip"
                         data-bs-placement="top" title="SUPPRIMER">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0000"
                             className="bi bi-trash3-fill cursor-pointer" viewBox="0 0 16 16">
                            <path
                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
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
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter un réappro
                </button>
            </div>
            <DataGrid
                rows={purchases}
                columns={purchaseColumns.concat(actionColumn)}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTablePurchases;