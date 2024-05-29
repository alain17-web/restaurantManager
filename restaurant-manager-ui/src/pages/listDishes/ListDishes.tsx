import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableDishes from "../../components/dataTableDishes/DataTableDishes.tsx";
import {dishes as dishData} from "../../tempData.ts";
import {useState,useEffect} from "react";
import NewDish from "../newDish/NewDish.tsx";

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



const Dishes = () => {

    const [dishes,setDishes]= useState<Dish[]>([])
    const [dishId, setDishId] = useState<number | null>(null)
    const [open,setOpen] = useState<boolean>(false);


    useEffect(() => {
        getDishes();
    }, []);

    const getDishes = () => {
        setDishes(dishData);
    };


    const handleGetDishId = (id: number) => {
        setDishId(id)
        setOpen(true);
    }

    const show = () => {
        setDishId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Plats et desserts</h1>
                {!open ? <DataTableDishes getDishId={handleGetDishId} open={show}/> : <NewDish id={dishId} setDishId={setDishId}/>}
                {open ?
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                            onClick={close}
                        >
                            Retour à la liste
                        </button>
                    </div> : ""
                }
            </div>
        </div>
    );
};
export default Dishes;