import TimeOptions from "../timeOptions/TimeOptions.tsx";
import {FormEvent, useEffect, useState} from "react";

const BookingForm = () => {

    const [success, setSuccess] = useState<boolean>(false);

    const [date, setDate] = useState<string>("");
    const [formatedDate, setFormatedDate] = useState<string>("");
    const [hour, setHour] = useState<string>("midi");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [people, setPeople] = useState<number>(1);

    const [errorDate, setErrorDate] = useState<string>('');
    const [errorName, setErrorName] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [allFieldsValid, setAllFieldsValid] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        validateDate()
        validateName()
        console.log(date, hour, name, email, people);

        if (date !== "") {
            const dateArr: string[] = date.split("-").reverse();
            dateArr.pop()
            setFormatedDate(dateArr.join("/"))
            if(allFieldsValid) {
                setSuccess(true);

            }
        }
    }

    const closeSuccessMsg = () => {
        setDate("")
        setHour("midi")
        setName("")
        setEmail("")
        setPeople(1)
        setSuccess(false);
    }



    const validateName = () => {
        setErrorName('')
        if (name === "" || !/^[A-Za-z0-9 ]{2,25}$/.test(name)) {
            setErrorName("Nom requis min: 2 max: 25");

        } else {
            setErrorName("");
        }
    }

    const validateDate = () => {
        setErrorDate('')
        if (date === "") {
            setErrorDate("Date requise");

        } else {
            setErrorDate("");
        }
    }

    const validateEmail = () => {
        setErrorEmail('')
        if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            setErrorEmail("Email non valide");

        } else {
            setErrorEmail("");
        }
    }

    useEffect(() => {
        setAllFieldsValid(
            date !== "" &&
            hour !== "" &&
            name !== "" && /^[A-Za-z]{2,25}$/.test(name) &&
            (email === "" || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
        );
    }, [date,hour,name,email]);

    const handleNameFocus = () => {
        validateDate()
    }

    const handleEmailFocus = () => {
        validateName()
    }

    const handlePeopleFocus = () => {
        validateEmail()
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
                            <label htmlFor="date" className={!errorDate ? "self-start block" : "self-start block text-red-500"}>{!errorDate ? "Date" : errorDate}</label>
                            <input
                                type="date"
                                id="date"
                                required
                                className={"w-full h-10 px-3 border border-[#008080]"}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                                onBlur={validateDate}
                            />
                        </div>
                        <div className={"input-group mt-12"}>
                            <select
                                onChange={(e) => {
                                setHour(e.target.value)}}
                            >
                                <TimeOptions/>
                            </select>
                        </div>
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <label htmlFor="name" className={!errorName ? "self-start block" : "self-start block text-red-500" }>{!errorName ? "Nom" : errorName}</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            onBlur={validateName}
                            onFocus={handleNameFocus}
                        />
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <label htmlFor="email" className={!errorEmail ? "self-start block" : "self-start block text-red-500"}>{!errorEmail ? "Email" : errorEmail} <span
                            className={"font-inter font-thin italic"}>(facultatif)</span></label>
                        <input
                            type="email"
                            id="email"
                            className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            onBlur={validateEmail}
                            onFocus={handleEmailFocus}
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
                            onFocus={handlePeopleFocus}
                        />
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <button
                            className={"w-full h-10 bg-[#008080] hover:bg-[#6B8E23] text-white text-xl font-inter cursor-pointer"}
                            disabled={!allFieldsValid ? true : false}
                            type="submit"
                        >
                            Réserver
                        </button>
                    </div>
                </form>
            ) : (
                <article className={"w-[60%] h-auto border-2 border-[#6B8E23] rounded-xl mt-20 p-5"}>
                    <p
                        className={"text-2xl hover:text-3xl hover:text-orange-700 font-bold cursor-pointer"}
                        onClick={closeSuccessMsg}
                    >
                        X
                    </p>
                    <p className={"text-center text-3xl text-[#6B8E23] font-inter"}>Merci {name}!</p>
                    <p className={"text-center text-2xl text-[#6B8E23] font-inter mt-8"}>Votre réservation
                        pour {people} {people > 1 ? "personnes" : "personne"} est confirmée. Nous vous accueillons
                        le {formatedDate} à {hour}.</p>
                </article>
            )}
        </section>
    );
};
export default BookingForm;