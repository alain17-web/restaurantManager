import DashboardSidebar from "../../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableDrinks from "../../../../components/dashboardComponents/dataTableDrinks/DataTableDrinks.tsx";
import {useEffect, useState} from "react";
import NewDrink from "../../newItemPages/newDrink/NewDrink.tsx";
import {Drink} from "../../../../types/types.ts";
import axiosInstance from "../../../../axios/axiosInstance.tsx";
import useUsername from "../../../../hooks/username/useUsername.tsx";

//See comments on ListActiveStaff to understand logic
const ListDrinks = () => {

    const [drinks, setDrinks] = useState<Drink[]>([])
    const [drinkId, setDrinkId] = useState<number | null>(null)
    const [open,setOpen] = useState<boolean>(false);
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    useEffect(() => {
        const getDrinks = async () => {
            try {
                const res = await axiosInstance.get('/drinks/')
                setDrinks(res.data)
            } catch (error) {
                console.error('Error in getDrinks', error);
            }
        }
        getDrinks()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    const handleGetDrinkId = (id: number) => {
        setDrinkId(id)
        setOpen(true);
    }

    const show = () => {
        setDrinkId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Boissons</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                {!open ? <DataTableDrinks drinks={drinks} getDrinkId={handleGetDrinkId} open={show}/> :
                    <NewDrink id={drinkId} drinks={drinks} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListDrinks;
