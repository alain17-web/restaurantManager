import TimeOptions from "../../components/timeOptions/TimeOptions.tsx";

const NewBooking = () => {
    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>Ajouter une réservation</h1>
                </div>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <form className={"w-[40%] flex flex-col mx-auto gap-8"} noValidate>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Date*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"date"}
                                required
                            />
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Heure*</label>
                            <select
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                required
                            >
                                <TimeOptions/>
                            </select>
                        </div>
                        <div className={"w-[75%]"}>
                            <label className={"flex items-center gap-[10px]"}>Nom*</label>
                            <input
                                className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                type={"text"}
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
                            <label className={"flex items-center gap-[10px]"}>Nombre de personnes*</label>
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
                            Ajouter une réservation
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};
export default NewBooking;