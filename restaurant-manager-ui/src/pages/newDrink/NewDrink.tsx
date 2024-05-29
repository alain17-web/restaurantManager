import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {drinks} from "../../tempData.ts";

interface Props {
    id: number | null
    setDrinkId: (id: number) => void
}

const NewDrink = (props:Props) => {

    const [name, setName] = useState<string>('');
    const [cat, setCat] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [min, setMin] = useState<number>(0);

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);

    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id]);

    const resetForm = () => {
        setAdd(true)
        setName("")
        setCat("")
        setPrice(0)
        setCost(0)
        setMin(0)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        drinks.map((drink) => {
            if (props.id === drink.id) {
                setAdd(false)
                setName(drink.name)
                setCat(drink.cat)
                setPrice(drink.price)
                setCost(drink.cost)
                setMin(drink.min)
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === "" || cat === "" || price === 0 || cost === 0 || min === 0) {
            setMessage("Tous les champs sont obligatoires")
            console.log(name,cat,price,cost,min)
        } else {
            setSuccess(true)
            setMessage(add ? "La boisson a bien été créée" : "Les modifications sont enregistrées")
        }
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if(!isNaN(value)){
            setPrice(value)
        } else {
            setPrice(0)
        }
    }

    const handleCost = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if(!isNaN(value)){
            setCost(value)
        } else {
            setCost(0)
        }
    }

    const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if(!isNaN(value)){
            setMin(value)
        } else {
            setMin(0)
        }
    }


    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter une boisson" : "Modifier une boisson"}</h1>
                </div>
                {success  ? (
                    <div className={"p-2 h-4 m-5 text-center text-green-600"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p>
                    </div>
                ) : (
                    <div className={"p-2 h-4 m-5 text-center text-green-600"}>
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
                            <label className={"flex items-center gap-[10px]"}>Nom*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Catégorie*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Prix de vente*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"number"}
                                step="0.01"
                                min="0"
                                required
                                value={price}
                                onChange={handlePrice}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Prix d'achat*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"number"}
                                step="0.01"
                                min="0"
                                required
                                value={cost}
                                onChange={handleCost}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Stock min*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"number"}
                                min="0"
                                required
                                value={min}
                                onChange={handleMin}
                            />
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            {add ? "Ajouter une boisson" : "Modifier une boisson"}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default NewDrink;