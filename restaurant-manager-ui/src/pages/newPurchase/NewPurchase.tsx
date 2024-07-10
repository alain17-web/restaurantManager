import {NewPurchaseData} from "../../types/types.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";

const NewPurchase = (props:NewPurchaseData) => {

    const [max,setMax] = useState<number>(0);
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {

    }, []);

    const getMax = async () => {
        try{
            //const res = await axiosInstance.get('/')

        }catch(error){
            console.error("no max found",error)
        }
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un réappro -" : "Modifier un réappro -"}<span className={"font-bold"}> Montant maximum : 6000€</span></h1>
                </div>
            </div>
        </div>
    );
};
export default NewPurchase;
