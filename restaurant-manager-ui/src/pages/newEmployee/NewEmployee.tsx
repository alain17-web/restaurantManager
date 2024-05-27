const NewEmployee = () => {
    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Ajouter un employé</h1>
                </div>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <form className={"w-[40%] flex flex-col mx-auto gap-8"} noValidate>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Identifiant*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Mot de passe*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"password"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Email*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"email"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Téléphone*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Rôle*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                            >
                                <option>Choisir un rôle</option>
                                <option>admin</option>
                                <option>waiter</option>
                                <option>cook</option>
                            </select>
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            Ajouter un employé
                        </button>
                    </form>
                </div>
            </div>
        </div>
        /*username:"liam",
            password:"waiter",
            email:"liam@gmail.com",
            tel:"0430/386921",
            role:"waiter",
            status:*/
    );
};
export default NewEmployee;