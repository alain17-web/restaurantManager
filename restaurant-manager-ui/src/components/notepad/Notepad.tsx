import {MouseEvent, useEffect, useState} from "react";
import { OrderItems} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import DateDisplay from "../dateDisplay/DateDisplay.tsx";
import useUsername from "../../hooks/useUsername.tsx";



const Notepad = () => {


    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [_validated, setValidated] = useState<string>('');
    const [_validatedBy,setValidatedBy] = useState<string | null>(null);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { username } = useUsername()


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


    const handleValidate = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(!orderId || !username){
            console.log("OrderId or username is undefined")
        }

        const validated = "ok"
        const validatedBy = username

        try{

            await axiosInstance.patch(`orderItems/${orderId}`, {order_id:orderId,validated:validated,validatedBy:validatedBy})
            await axiosInstance.patch(`orders/${orderId}`, {order_id:orderId,validated:validated,validatedBy:validatedBy})
            setIsValidated(true)

        }catch (error){
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
        if(isValidated){
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
                    <h1 className={"text-xl font-inter mt-22"}>Commande n°{orderId && orderId} : {orderItems.length / 4} pers</h1>
                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !=="" ? message : "Plats :"}</h2>
                    { orderItems.map((item):any => {
                       if (item.type === "maineCourse") {
                          return <p key={item.order_item_id}>{message ==="" && item.name}</p>
                       }
                    })}

                    <h2 className={"text-lg font-inter font-semibold italic"}>{message !=="" ? "" :"Desserts :"}</h2>
                    { orderItems.map((item):any => {
                        if (item.type === "desserts") {
                            return <p key={item.order_item_id}>{message ==="" && item.name}</p>
                        }
                    })}

                </div>
            ) : (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <h2 className={"text-xl text-green-600 font-inter font-semibold italic"}>Commande {orderId && orderId + " " }
                        validée</h2>
                </div>
            )}
            <button
                className={"w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                onClick={handleClick}
            >
                {!isValidated ? "Valider" : "Reset"}

            </button>
        </main>
    )
};
export default Notepad