import { FormEvent, useEffect, useState} from "react";
import {rosters} from "../../tempData.ts";

interface Props {
    id: number | null
    setRosterId: (id: number) => void
}

const NewRoster = (props: Props) => {

    const [roster, setRoster] = useState<string>("");
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
        setRoster("")
        setMessage("")
        setSuccess(false);
    }

    const handleEdit = () => {
        setMessage("")
        rosters.map((roster) => {
            if (props.id === roster.id) {
                setAdd(false)
                setRoster(roster.roster)
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (roster === "") {
            setMessage("Un horaire est obligatoire")
        } else {
            setSuccess(true)
            setMessage(add ? "L'horaire' a bien été créé" : "Les modifications sont enregistrées")
        }
    }


    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un horaire" : "Modifier un horaire"}</h1>
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
                            <label className={"flex items-center gap-[10px]"}>Horaires staff*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={roster}
                                onChange={(e) => setRoster(e.target.value)}
                            />
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            {add ? "Ajouter un horaire" : "Modifier un horaire"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default NewRoster;