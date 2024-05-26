import {dishes as dishesData} from "../../tempData.ts";
import {stockFoodsColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"

interface Food {
    id: number;
    name: string;
    cat:string;
    stock:number;
    min:number;
}

const DataTableStockFood = () => {

    const [dishes,setDishes] = useState<Food[]>([])

    useEffect(() => {
        getDishes()
    }, []);

    const getDishes =  () => {
        setDishes(dishesData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={dishes}
                columns={stockFoodsColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableStockFood;
