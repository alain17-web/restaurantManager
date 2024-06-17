import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableOrders from "../../components/dataTableOrders/DataTableOrders.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";
import {useEffect, useState} from "react";
import {Order} from "../../types/types.ts";

const ListOrders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [_orderId, setOrderId] = useState<number | null>(null);


    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axiosInstance.get('/orders/')
                setOrders(res.data)
            } catch (error) {
                console.error('Error in getOrders', error);
            }
        }
        getOrders()
    }, []);

    const handleGetOrderId = (order_id: number) => {
        setOrderId(order_id)
    }


    console.log('orders',orders)

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Commandes clients</h1>
                <DataTableOrders orders={orders} getOrderId={handleGetOrderId} />
            </div>
        </div>
    );
};
export default ListOrders;