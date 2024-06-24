import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import DataTableOrders from "../../components/dataTableOrders/DataTableOrders.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";
import {useEffect, useState} from "react";
import {Order} from "../../types/types.ts";
import OrderDetail from "../orderDetail/OrderDetail.tsx";

const ListOrders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);



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
        setOpen(true);
    }

    const show = () => {
        setOrderId(null)
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
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Commandes clients</h1>
                { !open ? <DataTableOrders orders={orders} getOrderId={handleGetOrderId} open={show}/> :
                    <OrderDetail order_id={orderId} setOrderId={setOrderId} />
                }
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
export default ListOrders;