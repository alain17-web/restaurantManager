import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableDishes from "../../components/dataTableDishes/DataTableDishes.tsx";
import {dishes as dishData} from "../../tempData.ts";
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

const Dishes = () => {

    const [open, setOpen] = useState<boolean>(false)

    const [dishes,setDishes]= useState<Dish[]>([])
    const [dishId, setDishId] = useState<number>(0)

    useEffect(() => {
        getDishes();
    }, []);

    const getDishes = () => {
        setDishes(dishData);
    };

    /*const handleGetDishId = (id:number) => {
        setDishId(id.toString)
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
    }

    const show = () => {
        setOpen(true)
    }*/
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Plats et desserts</h1>
                <DataTableDishes />
            </div>
        </div>
    );
};
export default Dishes;