 import {drinks as drinkData} from "../../tempData.ts";
 import {stockFoodsColumns} from "../../dataTable.ts";
 import {DataGrid} from "@mui/x-data-grid";
 import {useState, useEffect} from "react"

 interface Drink {
     id: number;
     name: string;
     cat:string;
     stock:number;
     min:number;
 }

 const DataTableStockDrinks = () => {

     const [drinks, setDrinks] = useState<Drink[]>([])

     useEffect(() => {
         getDrinks()
     }, []);


     const getDrinks = () => {
         setDrinks(drinkData);
     }

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