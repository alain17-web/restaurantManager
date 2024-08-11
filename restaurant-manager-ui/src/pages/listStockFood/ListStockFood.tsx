import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableStockFood from "../../components/dataTableStockFood/DataTableStockFood.tsx";
import {Dish} from "../../types/types.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";


const ListStockFood = () => {

    const { formattedDate } = useCurrentDate();

    const [dishes,setDishes]= useState<Dish[]>([])

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
    }, []);


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Stock nourriture au {formattedDate}</h1>
                <DataTableStockFood dishes={dishes}/>
            </div>
        </div>
    );
};
export default ListStockFood;