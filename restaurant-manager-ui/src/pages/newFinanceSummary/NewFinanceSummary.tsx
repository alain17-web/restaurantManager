import {FormEvent, useState,useEffect} from "react";
import {NewFinanceData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const NewFinanceSummary = (props: NewFinanceData) => {

    const [income, setIncome] = useState<number>(0);
    const [income_date, setIncome_date] = useState<string>("");
    const [comments, setComments] = useState<string > ("");
    const [spendings, setSpendings] = useState<number>(0);
    const [spending_date, setSpending_date] = useState<string>("");
    const [remarks, setRemarks] = useState<string>("");
    const [total_on_hand, setTotal_on_hand] = useState<number>(0);
    const [profits, setProfits] = useState<number>(0);

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id, props.financeSummaries]);

    const resetForm = () => {
        setAdd(true)
        setIncome(0)
        setIncome_date("")
        setComments("")
        setSpendings(0)
        setSpending_date("")
        setRemarks("")
        setTotal_on_hand(0)
        setProfits(0)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        const summary = props.financeSummaries.find((summary) => summary.id === props.id)
        if(summary){
            setAdd(false)
            setIncome(summary.income)
            setIncome_date(summary.income_date)
            setComments(summary.comments ?? "")
            setSpendings(summary.spendings)
            setSpending_date(summary.spending_date)
            setRemarks(summary.remarks ?? "")
            setTotal_on_hand(summary.total_on_hand)
            setProfits(summary.profits)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            if(add){
                await axiosInstance.post("/finances/addFinanceSummary",{income,income_date,comments,spendings,spending_date,remarks,total_on_hand,profits})
                setSuccess(true)
                setMessage("Le rapport a bien été créé")
            } else {
                await axiosInstance.patch(`/finances/${props.id}`, {income,income_date,comments,spendings,spending_date,remarks,total_on_hand,profits})
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
                                value={income}
                                onChange={(e) => setIncome(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Date entrée</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                placeholder={"DD/MM/YYYY"}
                                value={income_date}
                                onChange={(e) => setIncome_date(e.target.value)}
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
                                value={spendings}
                                onChange={(e) => setSpendings(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Date dépenses</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                placeholder={"DD/MM/YYYY"}
                                value={spending_date}
                                onChange={(e) => setSpending_date(e.target.value)}
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
                                onChange={(e) => setTotal_on_hand(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Bénéfices €</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                value={profits}
                                onChange={(e) => setProfits(parseFloat(e.target.value))}
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