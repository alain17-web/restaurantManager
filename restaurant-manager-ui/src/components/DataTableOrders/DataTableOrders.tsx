import {orders as orderData} from "../../tempData.ts";
import {ordersColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface Order {
    id:number
    date:string
    by:string
    people:number
    checked:boolean
    checkedBy:string
    total:number
}

const DataTableOrders = () => {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        getOrders()
    }, []);

    const getOrders = () => {
        setOrders(orderData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={orders}
                columns={ordersColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableOrders;