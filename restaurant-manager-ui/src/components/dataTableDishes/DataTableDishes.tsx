import {dishes as dishData} from "../../tempData.ts";
import {dishColumns} from '../../dataTable.ts'
import {DataGrid} from "@mui/x-data-grid";
import {useState,useEffect} from "react";

interface Dish {
    id: number;
    name: string;
    desc: string;
    img: string;
    price: number;
    cat: string;
    allerg?: string;
    cost:number;
    min:number;
}

interface Props{
    open:() => void
}

const DataTableDishes = (props:Props) => {

    const [dishes, setDishes] = useState<Dish[]>([])

    useEffect(() => {
        getDishes()
    }, [])

    const getDishes = () => {
        setDishes(dishData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
                    onClick={props.open}
                    className={"no-underline text-green-600 text-xl font-normal bg-[#F0F8FF p-[5px] border-1 border-green-600 rounded-md cursor-pointer"}>
                    Ajouter un plat
                </button>
            </div>
            <DataGrid
                rows={dishes}
                columns={dishColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
            />
        </div>
    );
};
export default DataTableDishes;