import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableDishes from "../../components/dataTableDishes/DataTableDishes.tsx";
import {useState,useEffect} from "react";
import NewDish from "../newDish/NewDish.tsx";
import {Dish} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const Dishes = () => {

    const [dishes,setDishes]= useState<Dish[]>([])
    const [dishId, setDishId] = useState<number | null>(null)
    const [open,setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);


    useEffect(() => {
        const getDishes = async () => {
            try {
                const res = await axiosInstance.get('/dishes/')
                setDishes(res.data)
            } catch (error) {
                console.error('Error in getDishes', error);
            }
        }
        getDishes()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
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
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Plats et desserts</h1>
                {!open ? <DataTableDishes dishes={dishes} getDishId={handleGetDishId} open={show}/> :
                    <NewDish id={dishId} setDishId={setDishId} dishes={dishes} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default Dishes;