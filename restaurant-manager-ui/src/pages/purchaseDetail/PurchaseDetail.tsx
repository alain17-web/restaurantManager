import {useEffect, useState} from "react";
import {ItemData, purchaseId} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";

const PurchaseDetail = (props:purchaseId) => {

    const [purchaseItems, setPurchaseItems] = useState<ItemData[]>([])
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if(props.purchase_id !== null && props.purchase_id !== undefined){
            getPurchaseItem()
        }
    }, [props.purchase_id]);

    const getPurchaseItem = async () => {
        try {
            const res = await axiosInstance.get(`/purchaseItems/${props.purchase_id}`);

            if (res.data && res.data.length === 0) {
                setMessage('Pas de plats trouvés pour cette commande')
            } else {
                setPurchaseItems(res.data.purchaseItem || []);
                setMessage("")
            }
        } catch (error) {
            console.error('Error in getOrderItem', error);
        }
    }

    return (
        <div className={"w-full-flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}> Détail de l'achat n°{props.purchase_id}</h1>
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
                            {purchaseItems.map((item, index): any => {
                                if (item.type === "plats" && item.qty > 0) {
                                    return <p key={index}>{item.name} <span className={"font-semibold"}>: {item.qty}pc</span></p>;
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                        <div>
                            {purchaseItems.map((item, index): any => {
                                if (item.type === "desserts" && item.qty > 0) {
                                    return <p key={index}>{item.name} <span
                                        className={"font-semibold"}>: {item.qty}pc</span></p>;
                                }
                            })}
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons froides :</h2>
                        <div>
                            {purchaseItems.map((item, index): any => {
                                if (item.type === "boissons froides" && item.qty > 0) {
                                    return <p key={index}>{item.name} <span
                                        className={"font-semibold"}>: {item.qty}pc</span></p>;
                                }
                            })}
                        </div>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Boissons chaudes :</h2>
                        <div>
                            {purchaseItems.map((item, index): any => {
                                if (item.type === "boissons chaudes" && item.qty > 0) {
                                    return <p key={index}>{item.name} <span
                                        className={"font-semibold"}>: {item.qty}pc</span></p>;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseDetail;