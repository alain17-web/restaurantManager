import {FormEvent, useEffect, useState} from "react";
import {NewRoleData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useUsername from "../../hooks/username/useUsername.tsx";


const NewRole = (props: NewRoleData) => {


    const [role_name, setRole_name] = useState<string>('');
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== null && props.id !== undefined) {
            handleEdit();
        } else {
            resetForm();
        }
    }, [props.id, props.roles]);

    const resetForm = () => {
        setAdd(true)
        setRole_name("")
        setMessage("")
        setSuccess(false);
    }

    const handleEdit = async () => {
        setMessage("");
        const role = props.roles.find((role) => role.id === props.id)
        if(role){
            setAdd(false)
            setRole_name(role.role_name)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (role_name === "") {
            setMessage("Un nom de rôle est obligatoire")
        } else {
            try{
                if(add){
                    await axiosInstance.post('/roles/addRole',{role_name})
                    setSuccess(true)
                    setMessage("Le rôle a bien été créé" )
                } else {
                    await axiosInstance.patch(`/roles/${props.id}`,{role_name})
                    setSuccess(true)
                    setMessage("Le rôle a bien été mis à jour")
                }

            }catch(error){
                console.error(error)
                setMessage(add ? "L'ajout du rôle a échoué" : "la mise à jour a échouée")
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
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un rôle" : "Modifier un rôle"}</h1>
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
                            <label className={"flex items-center gap-[10px]"}>Rôle*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={role_name}
                                onChange={(e) => setRole_name(e.target.value)}
                            />
                        </div>
                        <button
                            type={"submit"}
                            disabled={username === "guest"}
                            className={username !== "guest"? "w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer" : "w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-not-allowed"}
                        >
                            {add ? "Ajouter un rôle" : "Modifier un rôle"}
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
export default NewRole;