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

/*interface Props {
    getDishId: (id:number) => number;
    open: () => void
}*/

const DataTableDishes = () => {

    const [dishes, setDishes] = useState<Dish[]>([])

    useEffect(() => {
        getDishes()
    }, [])

    const getDishes = () => {
        setDishes(dishData);
    }

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });



    /*const actionColumn = [{
        field: "action",
        headerName: "",
        width: 80,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <div className="editButton" onClick={(e) => getDishId(params.row.id)} data-bs-toggle="tooltip"
                         data-bs-placement="top" title="VOIR DETAIL OU MODIFIER">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffa500"
                             className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>
                </div>
            )
        }
    }]*/

    return (
        <div className={"h-[950px] p-4"}>
            <div className={"w-full flex items-center justify-between text-[24px] mb-[10px]"}>
                <button
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