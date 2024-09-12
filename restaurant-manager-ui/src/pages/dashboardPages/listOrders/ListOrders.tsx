import DashboardSidebar from "../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import DataTableOrders from "../../../components/dashboardComponents/dataTableOrders/DataTableOrders.tsx";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import {useEffect, useState} from "react";
import {Order} from "../../../types/types.ts";
import OrderDetail from "../orderDetail/OrderDetail.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";

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

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Commandes clients</h1>
                {username === "guest" && <p className={"text-center text-red-400 text-base font-inter"}>Guest: READ ONLY</p>}
                { !open ? <DataTableOrders orders={orders} getOrderId={handleGetOrderId} open={show}/> :
                    <OrderDetail order_id={orderId}  />
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