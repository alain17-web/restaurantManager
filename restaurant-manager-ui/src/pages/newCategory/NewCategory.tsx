import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {categories} from "../../tempData.ts";

interface Props {
    id: number | null
    setCatId: (id: number) => void
}

const NewCategory = (props: Props) => {

    const [cat_name, setCat_name] = useState<string>('');
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
        setCat_name("")
        setMessage("")
        setSuccess(false);
    }

    const handleEdit = () => {
        setMessage("")
        categories.map((category) => {
            if (props.id === category.id) {
                setAdd(false)
                setCat_name(category.cat_name)
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (cat_name === "") {
            setMessage("Un nom de catégorie champs est obligatoire")
        } else {
            setSuccess(true)
            setMessage(add ? "La catégorie a bien été créée" : "Les modifications sont enregistrées")
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

