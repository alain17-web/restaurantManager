import {FormEvent, useEffect, useState} from "react";
import {employees} from "../../tempData.ts";
import RoleOption from "../../components/roleOptions/RoleOption.tsx";
import RosterOptions from "../../components/rosterOptions/RosterOptions.tsx";

interface Props {
    id: number | null
    setEmployeeId: (id: number) => void
}

const NewEmployee = (props: Props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [roster, setRoster] = useState<string>('');

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);

    const [add, setAdd] = useState<boolean>(true)

    useEffect(() => {
        if (props.id !== 0 && props.id !== undefined) {
            handleEdit()
        }else{
            resetForm()
        }
    }, [props.id]);

    const resetForm = () => {
        setAdd(true)
        setUsername("")
        setPassword("")
        setRole("")
        setEmail("")
        setTel("")
        setStatus("")
        setRoster("")
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        employees.map((employee) => {
            if (props.id === employee.id) {
                setAdd(false)
                setUsername(employee.username)
                setPassword(employee.password)
                setEmail(employee.email)
                setTel(employee.tel)
                setRole(employee.role)
                setStatus(employee.status)
                setRoster(employee.roster)
            }

        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "" || password === "" || email === "" || tel === "" || role === "" || status === "" || roster === "") {
            setMessage("Tous les champs sont obligatoires")
            console.log(username, password, email, tel, role,status,roster)
        } else {
            setSuccess(true)
            setMessage(add ? "L'employé a bien été créé" : "Les modifications sont enregistrées")
        }
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un employé" : "Modifier un employé"}</h1>
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
                            <label className={"flex items-center gap-[10px]"}>Identifiant*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
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
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
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
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Choisir un statut</option>
                                <option>actif</option>
                                <option>inactif</option>
                            </select>
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Horaire*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                                value={status}
                                onChange={(e) => setRoster(e.target.value)}
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