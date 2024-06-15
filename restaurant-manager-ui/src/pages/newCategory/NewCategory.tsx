import {FormEvent, useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";
import {Category, NewCatData} from "../../types/types.ts";




const NewCategory = (props: NewCatData) => {

    const [cat_name, setCat_name] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id,props.categories]);

    const resetForm = () => {
        setAdd(true)
        setCat_name("")
        setType("")
        setMessage("")
        setSuccess(false);
    }

    const handleEdit = () => {
        setMessage("")
        const category = props.categories.find((category) => category.id === props.id)
            if (category) {
                setAdd(false)
                setCat_name(category.cat_name)
                setType(category.type)
            }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (cat_name === "" || type === "") {
            setMessage("Un nom de catégorie est obligatoire")
        } else {
            try {
                let updatedCategory: Category;
                if (add) {
                    const res = await axiosInstance.post('/categories/addCategory', {cat_name,type})
                    updatedCategory = res.data.catResult
                    setSuccess(true)
                    setMessage("La catégorie a bien été créée")
                    props.onUpdate(updatedCategory)
                } else {
                    const res = await axiosInstance.patch(`/categories/${props.id}`, {cat_name,type})
                    console.log(res.data.catResult)
                    updatedCategory = res.data.catResult
                    setSuccess(true)
                    setMessage("La catégorie a bien été mise à jour")
                    props.onUpdate(updatedCategory)
                }


            } catch (error) {
                console.error(error)
                setMessage(add ? "L'ajout de la catégorie a échoué" : "la mise à jour a échouée")
            }
        }
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter une catégorie" : "Modifier une catégorie"}</h1>
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
                        className={"w-[40%] flex flex-col mx-auto gap-8"}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Catégorie*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={cat_name}
                                onChange={(e) => setCat_name(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Type*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                               <option>Choisir un type</option>
                               <option value={"food"}>food</option>
                               <option value={"beverage"}>beverage</option>
                            </select>
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            {add ? "Ajouter une catégorie" : "Modifier une catégorie"}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
        ;
};
export default NewCategory;

