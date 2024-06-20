import {useEffect, useState} from "react";
import { OrderItems} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import DateDisplay from "../dateDisplay/DateDisplay.tsx";



const Notepad = () => {


    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [orderNumber, setOrderNumber] = useState<number>(0);


    useEffect(() => {
        const getOrderItems = async () => {
            try{
                const res = await axiosInstance.get('/orderItems')
                console.log(res.data)
                setOrderItems(res.data)
                setOrderNumber(Math.floor(Math.random() * orderItems.length +1));
            } catch(error){
                console.error('Error in getOrderItems', error);
            }
        }
        getOrderItems();
    }, []);

    const handleValidate = () => {
        setIsValidated(!isValidated);
    }

    console.log(orderItems)
    return (
        <main
            className={"w-[500px] h-[900px] bg-[url('./img/bloc-notes.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center ml-20"}>

            {!isValidated ? (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <DateDisplay/>
                    <h1 className={"text-xl font-inter mt-22"}>Commande n°{orderNumber} : {orderItems.length / 4} pers</h1>
                    <h2 className={"text-lg font-inter font-semibold italic"}>Plats :</h2>
                    {orderItems.map((item):any => {
                       if (item.type === "maineCourse") {
                          return <p key={item.order_item_id}>{item.name}</p>
                       }
                    })}

                    <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                    {orderItems.map((item):any => {
                        if (item.type === "desserts") {
                            return <p key={item.order_item_id}>{item.name}</p>
                        }
                    })}

                </div>
            ) : (
                <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                    <h2 className={"text-xl text-green-600 font-inter font-semibold italic"}>Commande 22
                        validée</h2>
                    <h2 className={"text-lg font-inter font-semibold italic"}>Pas d'autre commande en attente</h2>
                </div>
            )}
            <button
                className={"w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                onClick={handleValidate}
            >
                {!isValidated ? "Valider" : "Reset"}

            </button>
        </main>
    )
};
export default Notepad