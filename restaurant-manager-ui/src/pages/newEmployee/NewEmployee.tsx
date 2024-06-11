import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import RoleOption from "../../components/roleOptions/RoleOption.tsx";
import RosterOptions from "../../components/rosterOptions/RosterOptions.tsx";
import { NewEmployeeData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const NewEmployee = (props: NewEmployeeData) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [role_id, setRole_id] = useState<number>(0);
    const [status_id, setStatus_id] = useState<number>(0);
    const [roster_id, setRoster_id] = useState<number>(0);

    const [usernameMessage, setUsernameMessage] = useState<string>('');
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);

    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== 0 && props.id !== undefined) {
            handleEdit()
        } else {
            resetForm()
        }
    }, [props.id, props.employees]);

    const resetForm = () => {
        setAdd(true)
        setUsername("")
        setPassword("")
        setRole_id(0)
        setEmail("")
        setTel("")
        setStatus_id(0)
        setRoster_id(0)
        setMessage("")
        setSuccess(false)
        setUsernameMessage("")
    }

    const handleEdit = () => {
        setMessage("")
        const employee = props.employees.find(employee => employee.id === props.id)
        if (employee) {
            setAdd(false)
            setUsername(employee.username)
            setPassword(employee.password)
            setEmail(employee.email)
            setTel(employee.tel)
            setRole_id(employee.role_id)
            setStatus_id(employee.status_id)
            setRoster_id(employee.roster_id)
        }
    }

    const validateUsername = (username: string) => {
        const existingUsernames = props.employees
            .filter(employee => employee.status_id === 1)
            .map(employee => employee.username);

        if (existingUsernames.includes(username)) {
            setUsernameMessage("Cet identifiant existe déjà");
        } else {
            setUsernameMessage("");
        }
    };

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        validateUsername(newUsername);
    };




    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "" || password === "" || email === "" || tel === "" || role_id === 0 || status_id === 0 || roster_id === 0) {
            setMessage("Tous les champs sont obligatoires")

        } else {
            try {
                if (add) {
                    await axiosInstance.post('/employees/addEmployee', {username, password, email, tel, role_id, status_id,roster_id})
                    setSuccess(true)
                    setMessage("L'employé a bien été créé")
                } else {
                    await axiosInstance.patch(`/employees/${props.id}`, {username, password, email, tel, role_id, status_id,roster_id})
                    setSuccess(true)
                    setMessage("L'employé' a bien été mis à jour")
                }

            } catch (error) {
                console.error(error)
                setMessage("L'ajout de l'employé a échoué")
            }
        }
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un employé" : "Modifier un employé"}</h1>
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
                            <label className={"flex items-center gap-[10px]"}>Identifiant*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500 placeholder:text-red-500"}
                                type={"text"}
                                required
                                value={username}
                                onChange={handleUsername}
                            />
                        </div>
                        {usernameMessage && (<p className={'text-red-500 text-base'}>{usernameMessage}</p>)}

                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Mot de passe*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Rôle*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={role_id}
                                onChange={(e) => setRole_id(parseInt(e.target.value))}
                            >
                                <RoleOption/>
                            </select>
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Email*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"email"}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Téléphone*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Statut*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={status_id}
                                onChange={(e) => setStatus_id(parseInt(e.target.value))}
                            >
                                <option>Choisir un statut</option>
                                <option value={1}>actif</option>
                                <option value={2}>inactif</option>
                            </select>
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Horaire*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={roster_id}
                                onChange={(e) => setRoster_id(parseInt(e.target.value))}
                            >
                                <RosterOptions/>
                            </select>
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            {add ? "Ajouter un employé" : "Modifier un employé"}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default NewEmployee;