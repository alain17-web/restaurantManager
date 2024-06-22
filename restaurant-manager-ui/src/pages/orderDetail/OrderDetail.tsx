import {OrderId, OrderItems} from "../../types/types.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";


const OrderDetail = (props: OrderId) => {
    //const [orderId, setOrderId] = useState<number | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (props.order_id !== null && props.order_id !== undefined) {
            getOrderItem()
        }
    }, [props.order_id,]);

    const getOrderItem = async () => {
        try {
            const res = await axiosInstance.get(`/orderItems/${props.order_id}`);
            console.log('API response', res);
            if (res.data.length === 0) {
                setMessage('Pas de plats trouvés pour cette commande')
            } else {
                setOrderItems(res.data.orderItem);
                setMessage("")
            }
        } catch (error) {
            console.error('Error in getOrderItem', error);
        }
    }

    console.log(orderItems)

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Commande n° {props.order_id}</h1>
                </div>
                {message !== "" && (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p>
                    </div>
                )}
                <div className={"custom-shadow p-[10px] m-5 flex items-center justify-around"}>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Plats :</h2>
                        <div>
                            {orderItems.map((item, index): any => {
                                if (item.type === "maineCourse") {
                                    return <p key={index}>{item.name}</p>
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                        <div>
                            {orderItems.map((item, index): any => {
                                if (item.type === "desserts") {
                                    return <p key={index}>{item.name}</p>
                                }
                            })}
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons froides :</h2>
                        <div>
                            {orderItems.map((item, index): any => {
                                if (item.type === "coldDrinks") {
                                    return <p key={index}>{item.name}</p>
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons chaudes :</h2>
                        <div>
                            {orderItems.map((item, index): any => {
                                if (item.type === "warmDrinks") {
                                    return <p key={index}>{item.name}</p>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderDetail;
