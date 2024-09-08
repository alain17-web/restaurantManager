import { FormEvent, useEffect, useState} from "react";
import { NewRosterData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useUsername from "../../hooks/username/useUsername.tsx";



const NewRoster = (props: NewRosterData) => {

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
    }, [props.id,props.rosters]);

    const resetForm = () => {
        setAdd(true)
        setRoster("")
        setMessage("")
        setSuccess(false);
    }

    const handleEdit = async () => {
        setMessage("");
        const roster = props.rosters.find((roster) => roster.id === props.id)
        if(roster){
            setAdd(false)
            setRoster(roster.roster)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (roster === "") {
            setMessage("Un horaire est obligatoire")
        } else {
            try{
                if(add){
                    await axiosInstance.post('/rosters/addRoster',{roster})
                    setSuccess(true)
                    setMessage("L'horaire a bien été créé" )
                } else {
                    await axiosInstance.patch(`/rosters/${props.id}`,{roster})
                    setSuccess(true)
                    setMessage("L'horaire a bien été mis à jour")
                }

            }catch(error){
                console.error(error)
                setMessage(add ? "L'ajout de l'horaire a échoué" : "la mise à jour a échouée")
            }
        }
    }

    const handleClose = () => {
        props.onAddOrEdit()
        props.close()
    }

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un horaire" : "Modifier un horaire"}</h1>
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
                            disabled={username === "guest"}
                            className={username !== "guest" ? "w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer" : "w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-not-allowed"}
                        >
                            {add ? "Ajouter un horaire" : "Modifier un horaire"}
                        </button>
                    </form>
                </div>
                <div className={"mb-2 pl-6"}>
                    <button
                        className={"mt-0 m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                        onClick={handleClose}
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        </div>
    );
};
export default NewRoster;