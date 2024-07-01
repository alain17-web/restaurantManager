import {stockFoodsColumns} from "../../dataTable.ts";
 import {DataGrid} from "@mui/x-data-grid";
 import {useState, useEffect} from "react"
 import { DataTableStockDrinkData, Drink} from "../../types/types.ts";


 const DataTableStockDrinks = (props:DataTableStockDrinkData) => {

     const [drinks, setDrinks] = useState<Drink[]>([])

     useEffect(() => {
         setDrinks(props.drinks)
     }, [props.drinks]);

     const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <DataGrid
                rows={drinks}
                columns={stockFoodsColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
 };
 export default DataTableStockDrinks;