import {MouseEvent, useEffect, useState} from "react";
import {OrderItems} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import DateDisplay from "../../generalComponents/dateDisplay/DateDisplay.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";
import useTotalOnHand from "../../../hooks/totalOnHand/useTotalOnHand.tsx";


const Notepad = () => {


    const [max, setMax] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [order_date, setOrder_date] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const [_validated, setValidated] = useState<string>('');
    const [_validatedBy, setValidatedBy] = useState<string | null>(null);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    // Fetches the total stock on hand using a custom hook
    const {totalOnHand} = useTotalOnHand();

    // Effect that sets the max value for stock when totalOnHand changes
    useEffect(() => {
        if (totalOnHand !== undefined && totalOnHand !== 0) {
            setMax(totalOnHand);
        }

    }, [totalOnHand]);

    // Fetches the username of the connected user using a custom hook
    const {username} = useUsername()


    // Async function to fetch order items from the server
    const getOrderItems = async () => {
        try {
            const res = await axiosInstance.get('/orderItems');
            if (res.data.length === 0) {
                setMessage('Pas de commande en attente');
            } else {
                setOrderItems(res.data);
                setOrderId(res.data[0].order_id); // Set the current order ID retrieved from the DB
                setMessage('');
            }
        } catch (error) {
            console.error('Error in getOrderItems', error);
        }
    };

    // Effect that fetches order items when the component mounts
    useEffect(() => {
        getOrderItems();

    }, []);

    // Effect that fetches specific order details when the orderId changes
    useEffect(() => {
        if (orderId !== undefined && orderId !== null) {
            getOrder(orderId)
        }
    }, [orderId]);

    // Async function to fetch a specific order based on its ID
    const getOrder = async (orderId: number | null) => {
        try {
            const res = await axiosInstance.get(`/orders/${orderId}`);
            if (res.data) {
                setOrder_date(res.data.order_date)
                setTotal(res.data.total);
            } else {
                console.log("no data found")
            }
        } catch (error) {
            console.error('Error in getOrder', error);
        }

    }


    // Handles the validation of an order, updates the order's status, and stock
    const handleValidate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!orderId || !username) {
            console.log("OrderId or username is undefined")
        }

        const validated = "ok" // Validation status
        const validatedBy = username; // User who validated the order


        try {
            // Updating the validation status of the order items and the order itself
            await axiosInstance.patch(`orderItems/${orderId}`, {
                order_id: orderId,
                validated: validated,
                validatedBy: validatedBy
            })
            await axiosInstance.patch(`orders/${orderId}`, {
                order_id: orderId,
                validated: validated,
                validatedBy: validatedBy
            })

            // Calculating the quantity of each ordered item
            const itemCounts: { [key: string]: number } = {};
            orderItems.forEach(item => {
                //making sure the name of each item has the correct format
                const normalizedItemName = item.name.trim().toLowerCase();
                itemCounts[normalizedItemName] = (itemCounts[normalizedItemName] || 0) + 1;
            });

            // Updating the stock based on the ordered items
            for (const [itemName, quantity] of Object.entries(itemCounts)) {
                await axiosInstance.patch('/stock/updateStock', {
                    item_name: itemName,
                    quantity: -quantity,
                });
            }

            // Updating the finance summary with the new total on hand
            const total_on_hand = max + total
            await axiosInstance.post('/finances/addFinanceSummary',{order_id:orderId,order_date,total,total_on_hand})
            setIsValidated(true)

        } catch (error) {
            console.error('Error in validate', error);

        }
    }

    // Resets the validation status
    const resetValidation = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsValidated(false);
        setValidated("");
        setValidatedBy(null);

        // and fetches the order items again
        try {
            const res = await axiosInstance.get('/orderItems');
            if (res.data.length === 0) {
                setMessage('Pas de commande en attente');
                setOrderId(null);
            } else {
                setMessage('');
                setOrderItems(res.data);
                setOrderId(res.data[0].order_id);
            }
        } catch (error) {
            console.error('Error fetching order items', error);
        }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (isValidated) {
            resetValidation(e) // If already validated, reset the validation
        } else {
            handleValidate(e) // Otherwise, validate the order
        }
    }

    return (
        <main
            className={"w-[500px] h-[900px] bg-[url('./img/bloc-notes.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center ml-20"}>

            {/* Conditionally rendering based on whether the order has been validated */}
            {!isValidated ? (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <DateDisplay/>
                    <h1 className={"text-xl font-inter mt-22"}>Commande
                        n°{orderId && orderId} : {orderItems.length / 4} pers</h1>
                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !== "" ? message : "Plats :"}</h2>

                    {/* Displaying main course items */}
                    {orderItems.map((item): any => {
                        if (item.type === "maineCourse") {
                            return <p key={item.order_item_id}>{message === "" && item.name}</p>
                        }
                    })}

                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !== "" ? "" : "Desserts :"}</h2>
                    {/* Displaying dessert items */}
                    {orderItems.map((item): any => {
                        if (item.type === "desserts") {
                            return <p key={item.order_item_id}>{message === "" && item.name}</p>
                        }
                    })}

                </div>
            ) : (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <h2 className={"text-xl text-green-600 font-inter font-semibold italic"}>Commande {orderId && orderId + " "}
                        validée</h2>
                </div>
            )}
            {/* Button for validation or reset depending on the state */}
            <button
                disabled={username === "guest"}
                className={username !== "guest" ? "w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer" : "w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-not-allowed"}
                onClick={handleClick}
            >
                {!isValidated ? "Valider" : "Reset"}

            </button>
        </main>
    )
};
export default Notepad