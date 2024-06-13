import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {dishes} from "../../tempData.ts";
import CategoryOptions from "../../components/categoryOptions/CategoryOptions.tsx";


interface Props {
    id: number | null
    setDishId: (id: number) => void
}

const NewDish = (props: Props) => {

    const [img, setImg] = useState<string>('')
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [cat, setCat] = useState<string>('');
    const [allerg, setAllerg] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [min, setMin] = useState<number>(0);

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [isDish] = useState<boolean>(true);

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
        setImg("")
        setName("")
        setDesc("")
        setCat("")
        setPrice(0)
        setCost(0)
        setMin(0)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        dishes.map((dish) => {
            if (props.id === dish.id) {
                setAdd(false)
                setImg(dish.img)
                setName(dish.name)
                setDesc(dish.desc)
                setCat(dish.cat)
                setPrice(dish.price)
                setCost(dish.cost)
                setMin(dish.min)
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (img ==="" || name === "" || desc === "" || cat === "" || price === 0 || cost === 0 || min === 0) {
            setMessage("Tous les champs sont obligatoires")

        } else {
            setSuccess(true)
            setMessage(add ? "Le plat a bien été créé" : "Les modifications sont enregistrées")
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
                <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un plat" : "Modifier un plat"}</h1>
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
                    className={"w-[40%] flex flex-col mx-auto gap-8"} noValidate
                    onSubmit={handleSubmit}
                >
                    <div className={"w-[75%]"}>
                        <label className={"flex items-center gap-[10px]"}>Photo*</label>
                        <input
                            className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                            type={"file"}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        <label className={"flex items-center gap-[10px]"}>Description*</label>
                        <textarea
                            className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                            required
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className={"w-[75%]"}>
                        <label className={"flex items-center gap-[10px]"}>Catégorie*</label>

                        <select
                            className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                            required
                            value={cat}
                            onChange={(e) => setCat(e.target.value)}
                        >
                            <CategoryOptions isDish={isDish}/>
                        </select>
                    </div>
                    <div className={"w-[75%]"}>
                        <label className={"flex items-center gap-[10px]"}>Allergènes*</label>
                        <input
                            className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                            type={"text"}
                            value={allerg}
                            onChange={(e) => setAllerg(e.target.value)}
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
                            onChange={(e) => setMin(parseInt(e.target.value))}
                        />
                    </div>
                    <button
                        type={"submit"}
                        className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                    >
                        {add ? "Ajouter un plat" : "Modifier un plat"}
                    </button>
                </form>
            </div>
        </div>
    </div>

    );
}
export default NewDish;