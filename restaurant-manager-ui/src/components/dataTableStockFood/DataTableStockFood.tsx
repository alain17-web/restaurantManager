import {stockFoodsColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react"
import { DataTableStockFoodData, Dish} from "../../types/types.ts";



const DataTableStockFood = (props:DataTableStockFoodData) => {

    const [dishes,setDishes] = useState<Dish[]>([])

    useEffect(() => {
        setDishes(props.dishes)
    }, [props.dishes]);

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
