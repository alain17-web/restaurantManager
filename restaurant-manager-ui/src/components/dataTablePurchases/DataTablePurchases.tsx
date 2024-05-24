import {purchases as purchaseData} from "../../tempData.ts";
import {purchaseColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface Purchase {
    id:number
    date:string
    by:string
    cost:number
    status:string
}

const DataTablePurchases = () => {

    const [purchases, setPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        getPurchases()
    }, []);

    const getPurchases = () => {
        setPurchases(purchaseData)
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter un réappro
                </button>
            </div>
            <DataGrid
                rows={purchases}
                columns={purchaseColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTablePurchases;