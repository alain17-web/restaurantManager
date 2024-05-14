import TimeOptions from "../timeOptions/TimeOptions.tsx";
import {FormEvent, useState} from "react";

const BookingForm = () => {

    const [success,setSuccess] = useState<boolean>(false);

    const [date, setDate] = useState<string>("");
    const [formatedDate, setFormatedDate] = useState<string>("");
    const [hour, setHour] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [people, setPeople] = useState<number>(1);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(date,hour,name,email,people);

        if(date !=="" && hour !=="" && name !==""){
            const dateArr:string[] = date.split("-").reverse();
            dateArr.pop()
            setFormatedDate(dateArr.join("/"))
            setSuccess(true);
        }
    }

    const handleClick = () => {
        setDate("")
        setHour("")
        setName("")
        setEmail("")
        setPeople(1)
        setSuccess(false);
    }

    return (
        <section className={"flex-1 h-full flex flex-col items-center"}>
            <h1 className={"text-2xl font-inter italic mt-5"}>Réserver une table</h1>
            {!success ? (
                <form
                className={"w-[70%] h-full flex flex-col items-center mt-5"}
                noValidate
                onSubmit={handleSubmit}
            >
                <div className={"w-[40%] flex items center justify-between"}>
                    <div className={"input-group mt-5 flex flex-col items-center"}>
                        <label htmlFor="date" className={"self-start block"}>Date</label>
                        <input
                            type="date"
                            id="date"
                            required
                            className={"w-full h-10 px-5 border border-[#008080]"}
                            value={date}
                            onChange={(e) => {
                            setDate(e.target.value)
                             }}


                        />
                    </div>
                    <div className={"input-group mt-12"}>
                        <select onChange={(e) => {
                            setHour(e.target.value)
                        }}>
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
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <label htmlFor="email" className={"self-start block"}>Email <span
                        className={"font-inter font-thin italic"}>(facultatif)</span></label>
                    <input
                        type="email"
                        id="email"
                        className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
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
                        value={people}
                        onChange={(e) => {
                            setPeople(parseInt(e.target.value, 10))
                        }}
                    />
                </div>
                <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                    <button
                        className={"w-full h-10 bg-[#008080] hover:bg-[#6B8E23] text-white text-xl font-inter cursor-pointer"}
                        type="submit"
                    >
                        Réserver
                    </button>
                </div>
            </form>
            ):(
                <div className={"w-[60%] h-auto border-2 border-[#6B8E23] rounded-xl mt-20 p-5"}>
                    <p
                        className={"text-2xl hover:text-3xl hover:text-orange-700 font-bold cursor-pointer"}
                        onClick={handleClick}
                    >
                        X
                    </p>
                    <p className={"text-center text-3xl text-[#6B8E23] font-inter"}>Merci {name}!</p>
                    <p className={"text-center text-2xl text-[#6B8E23] font-inter mt-8"}>Votre réservation pour {people} {people > 1 ?"personnes" : "personne" } est confirmée. Nous vous accueillons le {formatedDate} à {hour}.</p>
                </div>
            )
            }
        </section>
    );
};
export default BookingForm;