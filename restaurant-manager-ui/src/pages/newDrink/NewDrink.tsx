import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import CategoryOptions from "../../components/categoryOptions/CategoryOptions.tsx";
import {NewDrinkData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";

const NewDrink = (props:NewDrinkData) => {

    const [name, setName] = useState<string>('');
    const [cat_id, setCat_id] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [min, setMin] = useState<number>(0);

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [isDish] = useState<boolean>(false);

    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id,props.drinks]);

    const resetForm = () => {
        setAdd(true)
        setName("")
        setCat_id(0)
        setPrice(0)
        setCost(0)
        setMin(0)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        const drink = props.drinks.find((drink) => drink.id === props.id)
            if (drink) {
                setAdd(false)
                setName(drink.name)
                setCat_id(drink.cat_id)
                setPrice(drink.price)
                setCost(drink.cost)
                setMin(drink.min)
            }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === "" || cat_id === 0 || price === 0 || cost === 0 || min === 0) {
            setMessage("Tous les champs sont obligatoires")
        } else {
            try{
                if(add){
                    await axiosInstance.post('/drinks/addDrink',{name,cat_id,price,cost,min})
                    setSuccess(true)
                    setMessage("La boisson a bien été créée" )
                } else {
                    await axiosInstance.patch(`/drinks/${props.id}`,{name,cat_id,price,cost,min})
                    setSuccess(true)
                    setMessage("La boisson a bien été mise à jour")
                }

            }catch(error){
                console.error(error)
                setMessage(add ? "L'ajout de la boisson a échoué"  : "la mise à jour a échouée")
            }
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

                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={cat_id}
                                onChange={(e) => setCat_id(parseInt(e.target.value))}
                            >
                                <CategoryOptions isDish={isDish}/>
                            </select>
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
                                onChange={(e) => setMin(parseInt(e.target.value))}
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