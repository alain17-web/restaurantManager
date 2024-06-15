import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import CategoryOptions from "../../components/categoryOptions/CategoryOptions.tsx";
import {NewDishData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const NewDish = (props: NewDishData) => {

    const [img, setImg] = useState<File | null>(null)
    const [imgUrl, setImgUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [cat_id, setCat_id] = useState<number>(0);
    const [allerg, setAllerg] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [min, setMin] = useState<number>(0);

    const [message, setMessage] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false);
    const [isDish] = useState<boolean>(true);

    const [add, setAdd] = useState<boolean>(true)


    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id, props.dishes]);

    const resetForm = () => {
        setAdd(true)
        setImg(null)
        setImgUrl("")
        setName("")
        setDesc("")
        setCat_id(0)
        setAllerg("")
        setPrice(0)
        setCost(0)
        setMin(0)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        const dish = props.dishes.find((dish) => dish.id === props.id)
        if (dish) {
            console.log(dish.img)
            setAdd(false)
            setImgUrl(dish.img ? `/api/uploads/img/${dish.img}` : '')
            setName(dish.name)
            setDesc(dish.desc)
            setCat_id(dish.cat_id)
            setAllerg(dish.allerg ? dish.allerg : "")
            setPrice(dish.price)
            setCost(dish.cost)
            setMin(dish.min)
        }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (img === null && imgUrl === '' || name === "" || desc === "" || cat_id === 0 || price === 0 || cost === 0 || min === 0) {
            setMessage("Tous les champs sont obligatoires")

        } else {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('desc', desc);
                formData.append('cat_id', String(cat_id));
                formData.append('allerg', allerg);
                formData.append('price', String(price));
                formData.append('cost', String(cost));
                formData.append('min', String(min));
                if (img) {
                    formData.append('img', img);
                }
                if (add) {

                    await axiosInstance.post('/dishes/addDish', formData)
                    setSuccess(true)
                    setMessage("Le plat a bien été créé")
                } else {
                    await axiosInstance.patch(`/dishes/${props.id}`, formData)
                    setSuccess(true)
                    setMessage("Le plat a bien été mise à jour")
                }

            } catch (error) {
                console.error(error)
                setMessage(add ? "L'ajout du plat a échoué" : "la mise à jour a échouée")
            }
        }
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (!isNaN(value)) {
            setPrice(value)
        } else {
            setPrice(0)
        }
    }

    const handleCost = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (!isNaN(value)) {
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
                {success ? (
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
                            {imgUrl && !img && (
                            <img src={imgUrl} alt="Current" className={"mb-2"}
                                 style={{width: "100px", height: "100px"}}/>
                            )}

                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"file"}
                                required
                                //value={img}
                                onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
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
                                value={cat_id}
                                onChange={(e) => setCat_id(parseInt(e.target.value))}
                            >
                                <CategoryOptions isDish={isDish}/>
                            </select>
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Allergènes</label>
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