import { drinks as drinkData} from "../../tempData.ts";
import {drinksColumns} from "../../dataTable.ts";
import {DataGrid} from "@mui/x-data-grid";
import {useState,useEffect} from "react"

interface Drink {
    id: number;
    name: string;
    price: number;
    cat: string;
    cost: number;
    min: number;
}

interface Props{
    open:() => void
}


const DataTableDrinks = (props:Props) => {

    const [drinks, setDrinks] = useState<Drink[]>([])

    useEffect(() => {
        getDrinks()
    }, [])

    const getDrinks = () => {
        setDrinks(drinkData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    onClick={props.open}
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter une boisson
                </button>
            </div>
            <DataGrid
                rows={drinks}
                columns={drinksColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableDrinks;

