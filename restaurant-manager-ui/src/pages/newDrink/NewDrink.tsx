const NewDrink = () => {
    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Ajouter une boisson</h1>
                </div>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <form className={"w-[40%] flex flex-col mx-auto gap-8"} noValidate>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Nom*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Catégorie*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Prix de vente*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Prix d'achat*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Stock min*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
                                required
                            />
                        </div>
                        <button
                            type={"submit"}
                            className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                        >
                            Ajouter une boisson
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default NewDrink;