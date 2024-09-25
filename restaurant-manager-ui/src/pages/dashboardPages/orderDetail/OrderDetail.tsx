
import { OrderId, OrderItems } from "../../../types/types.ts";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axiosInstance.tsx";

const OrderDetail = (props: OrderId) => {
    // Defining state variables for storing order items and a message.
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]); // Stores the order items fetched from the API.
    const [message, setMessage] = useState<string>("");

    // useEffect to trigger when the component mounts or `props.order_id` changes.
    useEffect(() => {

        if (props.order_id !== null && props.order_id !== undefined) {
            getOrderItem(); // Fetch the order items.
        }
    }, [props.order_id]); // Dependency array to ensure the effect runs only when `order_id` changes.

    // Async function to fetch order items based on `order_id`.
    const getOrderItem = async () => {
        try {
            // API call to fetch order items using the `order_id` prop.
            const res = await axiosInstance.get(`/orderItems/${props.order_id}`);
            console.log('API response', res);

            // If the response contains no order items, display a message.
            if (res.data.length === 0) {
                setMessage('Pas de plats trouvés pour cette commande'); // No items found message.
            } else {
                // Otherwise, set the fetched items and clear the message.
                setOrderItems(res.data.orderItem);
                setMessage("");
            }
        } catch (error) {
            // Catch and log any errors during the API call.
            console.error('Error in getOrderItem', error);
        }
    }


    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Commande n° {props.order_id}</h1>
                </div>
                {/* Display message if it exists */}
                {message !== "" && (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p> {/* Message display */}
                    </div>
                )}

                <div className={"custom-shadow p-[10px] m-5 flex items-center justify-around"}>
                    <div className={"flex flex-col"}> {/* Column for displaying main dishes and desserts */}
                        <h2 className={"text-lg font-inter font-semibold italic"}>Plats :</h2>
                        <div>
                            {orderItems.map((item, index) => { // Loop through `orderItems` to display main courses
                                if (item.type === "maineCourse") {
                                    return <p key={index}>{item.name}</p> // Display item name if type is "maineCourse"
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                        <div>
                            {orderItems.map((item, index) => { // Loop through `orderItems` to display desserts
                                if (item.type === "desserts") {
                                    return <p key={index}>{item.name}</p> // Display item name if type is "desserts"
                                }
                            })}
                        </div>
                    </div>
                    <div className={"flex flex-col"}> {/* Column for displaying cold and warm drinks */}
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons froides :</h2>
                        <div>
                            {orderItems.map((item, index) => { // Loop through `orderItems` to display cold drinks
                                if (item.type === "coldDrinks") {
                                    return <p key={index}>{item.name}</p> // Display item name if type is "coldDrinks"
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons chaudes :</h2>
                        <div>
                            {orderItems.map((item, index) => { // Loop through `orderItems` to display warm drinks
                                if (item.type === "warmDrinks") {
                                    return <p key={index}>{item.name}</p> // Display item name if type is "warmDrinks"
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
