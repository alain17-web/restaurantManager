import {FormEvent, useState,useEffect} from "react";
import {NewFinanceData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useTotalOnHand from "../../hooks/totalOnHand/useTotalOnHand.tsx";


const NewFinanceSummary = (props: NewFinanceData) => {

    const {totalOnHand} = useTotalOnHand()

    const [total, setTotal] = useState<number>(0);
    const [order_date, setOrder_date] = useState<string>("");
    const [order_id,setOrder_id] = useState<number>(0);
    const [comments, setComments] = useState<string > ("");
    const [totalPurchase, setTotalPurchase] = useState<number>(0);
    const [purchase_date, setPurchase_date] = useState<string>("");
    const [purchase_id, setPurchase_id] = useState<number>(0);
    const [remarks, setRemarks] = useState<string>("");
    const [total_on_hand, setTotal_on_hand] = useState<number>(0);


    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        setTotal_on_hand(totalOnHand);
    }, [totalOnHand]);

    useEffect(() => {
        if (total !== 0 && totalPurchase === 0) {
            setTotal_on_hand(totalOnHand + total);
        } else if (total === 0 && totalPurchase !== 0) {
            setTotal_on_hand(totalOnHand - totalPurchase);
        } else if (total !== 0 && totalPurchase !== 0) {
            setTotal_on_hand(totalOnHand + total - totalPurchase);
        } else {
            setTotal_on_hand(totalOnHand);
        }
    }, [total, totalPurchase, totalOnHand]);

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id, props.financeSummaries]);

    const resetForm = () => {
        setAdd(true)
        setTotal(0)
        setOrder_date("")
        setOrder_id(0)
        setComments("")
        setTotalPurchase(0)
        setPurchase_date("")
        setPurchase_id(0)
        setRemarks("")
        setTotal_on_hand(totalOnHand)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        const summary = props.financeSummaries.find((summary) => summary.id === props.id)
        if(summary){
            setAdd(false)
            setTotal(summary.total ?? 0)
            setOrder_date(summary.order_date ?? "")
            setOrder_id(summary.order_id ?? 0)
            setComments(summary.comments ?? "")
            setTotalPurchase(summary.totalPurchase ?? 0)
            setPurchase_date(summary.purchase_date ?? "")
            setPurchase_id(summary.purchase_id ?? 0)
            setRemarks(summary.remarks ?? "")
            setTotal_on_hand(summary.total_on_hand )

        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try{
            if(add){
                await axiosInstance.post("/finances/addFinanceSummary",{
                    total,
                    order_date,
                    order_id,
                    comments,
                    totalPurchase,
                    purchase_date,
                    purchase_id,
                    remarks,
                    total_on_hand
                })
                setSuccess(true)
                setMessage("Le rapport a bien été créé")
            } else {
                await axiosInstance.patch(`/finances/${props.id}`, {
                    total,
                    order_date,
                    order_id,
                    comments,
                    totalPurchase,
                    purchase_date,
                    purchase_id,
                    remarks,
                    total_on_hand
                })
                setSuccess(true)
                setMessage("Le rapport a bien été mis à jour")
            }
        }catch(error){
            console.log(error)
            setMessage(add ? "L'ajout du rapport a échoué" : "La modification du rapport a échouée")
        }
    }



    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un rapport" : "Modifier un rapport"}</h1>
                </div>
                {success ? (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p>
                    </div>
                ) : (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-red-600 text-2xl"}>{message}</p>
                    </div>
                )}
                <div className={"custom-shadow p-[10px] m-5"}>
                    <form
                        className={"w-[40%] flex flex-col mx-auto gap-8"}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Revenus €</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                value={total}
                                onChange={(e) => setTotal(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Date entrée</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                placeholder={"DD/MM/YYYY"}
                                value={order_date}
                                onChange={(e) => setOrder_date(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Remarques</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Dépenses €</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                value={totalPurchase}
                                onChange={(e) => setTotalPurchase(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Date dépenses</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                placeholder={"DD/MM/YYYY"}
                                value={purchase_date}
                                onChange={(e) => setPurchase_date(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Remarques</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Total disponible €*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                placeholder={"DD/MM/YYYY"}
                                required
                                value={total_on_hand}

                            />
                        </div>


                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            {add ? "Ajouter un rapport" : "Modifier un rapport"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default NewFinanceSummary;