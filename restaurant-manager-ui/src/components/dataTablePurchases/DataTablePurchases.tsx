import {purchases as purchaseData} from "../../tempData.ts";
import {purchaseColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import { Purchase } from "../../types/types.ts";


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