const NewDish = () => {
    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
               {/* id:20,
                name:"Assiette Kebbeh d'Arraba",
                desc:"3 Kebbehs, taboulé, baba ghanouj, houmous et sauce à l'ail (G; N; S)",
                img:"./img/kebbeh.jpg",
                price:16.50,
                cat:"Assiette froides",
                allerg: "Poids chiches",
                cost:11.55,
                min:10,
                stock:20*/}
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Ajouter un plat</h1>
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
                            <label className={"flex items-center gap-[10px]"}>Description*</label>
                            <textarea
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
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
                            <label className={"flex items-center gap-[10px]"}>Allergènes*</label>
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
                            Ajouter un plat
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default NewDish;