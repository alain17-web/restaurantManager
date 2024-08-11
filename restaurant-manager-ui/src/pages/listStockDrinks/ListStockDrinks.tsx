import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableStockDrinks from "../../components/dataTableStockDrinks/DataTableStockDrinks.tsx";
import {useEffect, useState} from "react";
import {Drink} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";


const ListStockDrinks = () => {

    const { formattedDate } = useCurrentDate();

    const [drinks, setDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        const getDrinks = async () => {
            try {
                const res = await axiosInstance.get('/drinks/')
                setDrinks(res.data)
            } catch (error) {
                console.error('Error in getDishes', error);
            }
        }
        getDrinks()
    }, []);


    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Stock boissons au {formattedDate}</h1>
                <DataTableStockDrinks drinks={drinks}/>
            </div>
        </div>
    );
};
export default ListStockDrinks;