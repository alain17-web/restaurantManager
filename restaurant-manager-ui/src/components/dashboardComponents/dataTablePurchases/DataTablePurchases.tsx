import {purchaseColumns} from "../../../dataTable.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import {DataTablePurchaseData, Purchase} from "../../../types/types.ts";
import {confirmAlert} from "react-confirm-alert";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";
import ForbidenDelete from "../forbidenDelete/ForbidenDelete.tsx";


const DataTablePurchases = (props: DataTablePurchaseData) => {

    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [_deliveryDate, setDeliveryDate] = useState<string>("")

    useEffect(() => {
        setPurchases(props.purchases)
        props.purchases.forEach(purchase => {
            setDeliveryDate(purchase.delivery_date)
        })
    }, [props.purchases]);

    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10});

    const handleDelete = (purchase_id: number): void => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ce réappro ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try {
                            await axiosInstance.delete(`/purchaseItems/${purchase_id}`)
                            await axiosInstance.delete(`/purchases/${purchase_id}`)
                            setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.purchase_id !== purchase_id))
                        } catch (error) {
                            console.error("deletion failed", error)
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => console.log("deletion cancelled")
                }
            ]
        })
    }

    const {username} = useUsername()

    const actionColumn: GridColDef[] = [{
        field: "action",
        headerName: "",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <div className={"flex items-center mt-3"}>
                    <div
                        className={"py-[2px] px-[5px] mr-2 text-[00008B] border-[1px] border-gray-200 rounded-md cursor-pointer"}
                        onClick={() => props.getPurchaseIdAndDeliveryDate(params.row.purchase_id, params.row.delivery_date)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top" title="VOIR DETAIL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffa500"
                             className="bi bi-pencil-fill cursor-pointer" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>
                    <>
                        {username !== "guest" ? (
                            <div className={"py-[2px] px-[5px] text-[DC143C] border-[1px] border-gray-200"}
                                 onClick={() => handleDelete(params.row.purchase_id)} data-bs-toggle="tooltip"
                                 data-bs-placement="top" title="SUPPRIMER">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0000"
                                     className="bi bi-trash3-fill cursor-pointer" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </div>) : (
                            <ForbidenDelete/>
                        )
                        }
                    </>
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
                getRowId={() => crypto.randomUUID()}
                columns={purchaseColumns.concat(actionColumn)}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTablePurchases;