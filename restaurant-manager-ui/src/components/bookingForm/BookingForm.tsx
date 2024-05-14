import TimeOptions from "../timeOptions/TimeOptions.tsx";

const BookingForm = () => {
    return (
        <section className={"flex-1 h-full flex flex-col items-center"}>
            <h1 className={"text-2xl font-inter italic mt-5"}>Réserver une table</h1>
            <form className={"w-[70%] h-full flex flex-col items-center mt-5"}>
                <div className={"w-[40%] flex items center justify-between"}>
                    <div className={"input-group mt-5 flex flex-col items-center"}>
                        <label htmlFor="date" className={"self-start block"}>Date</label>
                        <input
                            type="date"
                            id="date"
                            required
                            className={"w-full h-10 px-5 border border-[#008080]"}
                        />
                    </div>
                    <div className={"input-group mt-12"}>
                        <select>
                            <TimeOptions/>
                        </select>
                    </div>
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <label htmlFor="name" className={"self-start block"}>Nom</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                    />
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <label htmlFor="email" className={"self-start block"}>Email <span
                        className={"font-inter font-thin italic"}>(facultatif)</span></label>
                    <input
                        type="email"
                        id="email"
                        className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                    />
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <label htmlFor="numberOfPeople" className={"self-start block"}>Nombre de pers (10
                        max)</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        id="numberOfPeople"
                        required
                        className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                    />
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <button
                        className={"w-full h-10 bg-[#008080] hover:bg-[#6B8E23] text-white text-xl font-inter cursor-pointer"}>Réserver
                    </button>
                </div>
            </form>
        </section>
    );
};
export default BookingForm;