import {MouseEvent, useEffect, useState} from "react";
import {OrderItems} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import DateDisplay from "../dateDisplay/DateDisplay.tsx";
import useUsername from "../../hooks/username/useUsername.tsx";
import useTotalOnHand from "../../hooks/totalOnHand/useTotalOnHand.tsx";


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
    const {totalOnHand} = useTotalOnHand();

    useEffect(() => {
        if (totalOnHand !== undefined && totalOnHand !== 0) {
            setMax(totalOnHand);
        }

    }, [totalOnHand]);

    const {username} = useUsername()


    const getOrderItems = async () => {
        try {
            const res = await axiosInstance.get('/orderItems');
            if (res.data.length === 0) {
                setMessage('Pas de commande en attente');
            } else {
                setOrderItems(res.data);
                setOrderId(res.data[0].order_id);
                setMessage('');
            }
        } catch (error) {
            console.error('Error in getOrderItems', error);
        }
    };

    useEffect(() => {
        getOrderItems();

    }, []);

    useEffect(() => {
        if (orderId !== undefined && orderId !== null) {
            getOrder(orderId)
        }
    }, [orderId]);

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


    const handleValidate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!orderId || !username) {
            console.log("OrderId or username is undefined")
        }

        const validated = "ok"
        const validatedBy = username

        try {

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

            const itemCounts: { [key: string]: number } = {};
            orderItems.forEach(item => {
                const normalizedItemName = item.name.trim().toLowerCase();
                itemCounts[normalizedItemName] = (itemCounts[normalizedItemName] || 0) + 1;
            });

            for (const [itemName, quantity] of Object.entries(itemCounts)) {
                await axiosInstance.patch('/stock/updateStock', {
                    item_name: itemName,
                    quantity: -quantity,
                });
            }

            const total_on_hand = max + total
            await axiosInstance.post('/finances/addFinanceSummary',{order_id:orderId,order_date,total,total_on_hand})
            setIsValidated(true)

        } catch (error) {
            console.error('Error in validate', error);

        }
    }

    const resetValidation = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsValidated(false);
        setValidated("");
        setValidatedBy(null);

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
            resetValidation(e)
        } else {
            handleValidate(e)
        }
    }

    return (
        <main
            className={"w-[500px] h-[900px] bg-[url('./img/bloc-notes.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center ml-20"}>

            {!isValidated ? (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <DateDisplay/>
                    <h1 className={"text-xl font-inter mt-22"}>Commande
                        n°{orderId && orderId} : {orderItems.length / 4} pers</h1>
                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !== "" ? message : "Plats :"}</h2>
                    {orderItems.map((item): any => {
                        if (item.type === "maineCourse") {
                            return <p key={item.order_item_id}>{message === "" && item.name}</p>
                        }
                    })}

                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !== "" ? "" : "Desserts :"}</h2>
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