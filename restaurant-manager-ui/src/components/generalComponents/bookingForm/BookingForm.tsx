
import TimeOptions from "../timeOptions/TimeOptions.tsx";
import {FormEvent, useEffect, useState} from "react";
import SuccessMsg from "../successMsg/SuccessMsg.tsx";
import axios from "axios"
import {useNotifDispatch} from "../../../hooks/notifications/useNotifDispatch.tsx";


const BookingForm = () => {

    const dispatch = useNotifDispatch()

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<string>("");
    const [hour, setHour] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [people, setPeople] = useState<number>(1);

    const [errorDate, setErrorDate] = useState<string>('');
    const [errorName, setErrorName] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [allFieldsValid, setAllFieldsValid] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        validateDate();
        validateName();
        validateEmail();

        if (currentDate !== "") {
            // Convert 'YYYY-MM-DD' to 'DD/MM/YYYY'
            const formattedDate = currentDate.split("-").reverse().join("/");

            if (allFieldsValid) {
                try {
                    setError(false);
                     await axios.post("http://localhost:3000/api/bookings/addBooking", {
                        date: formattedDate,
                        hour,
                        name,
                        email,
                        people
                    });
                     setSuccess(true);
                } catch (err) {
                    console.log("Booking error:", err);
                    setError(true);
                }
            }
        }
    };

    const closeSuccessMsg = () => {
        setCurrentDate("");
        setHour("");
        setName("");
        setEmail("");
        setPeople(1);
        setSuccess(false);
        setError(false);
        dispatch({ type: 'ADD_BOOKING_NOTIF'})
    };

    const validateName = () => {
        setErrorName('');
        if (name === "" || !/^[A-Za-z0-9 ]{2,25}$/.test(name)) {
            setErrorName("Nom requis min: 2 max: 25");
        } else {
            setErrorName("");
        }
    };

    const validateDate = () => {
        setErrorDate('');
        if (currentDate === "") {
            setErrorDate("Date requise");
        } else {
            setErrorDate("");
        }
    };

    const validateEmail = () => {
        setErrorEmail('');
        if (email === "" || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            setErrorEmail("Email non valide");
        } else {
            setErrorEmail("");
        }
    };

    useEffect(() => {
        setAllFieldsValid(
            currentDate !== "" &&
            hour !== "" &&
            name !== "" && /^[A-Za-z0-9 ]{2,25}$/.test(name) &&
            email !== "" && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
        );
    }, [currentDate, hour, name, email]);

    const handleNameFocus = () => {
        validateDate();
    };

    const handleEmailFocus = () => {
        validateName();
    };

    const handlePeopleFocus = () => {
        validateEmail();
    };

    return (
        <section className={"flex-1 h-full flex flex-col items-center"}>
            <h1 className={"text-2xl font-inter italic mt-4"}>Réserver une table</h1>
            {!success && !error ? (
                <form
                    className={"w-[55%] h-auto flex flex-col items-center"}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <div className={"w-full flex items-center justify-between"}>
                        <div className={"input-group mt-5 flex flex-col items-center"}>
                            <label htmlFor="currentDate" className={!errorDate ? "self-start block" : "self-start block text-red-500"}>{!errorDate ? "Date*" : errorDate}</label>
                            <input
                                type="date"
                                id="currentDate"
                                required
                                className={"w-[70%] h-10 px-3 border border-[#008080]"}
                                value={currentDate}
                                onChange={(e) => {
                                    setCurrentDate(e.target.value);
                                }}
                                onBlur={validateDate}
                            />
                        </div>
                        <div className={"input-group mt-[73px]"}>
                            <select
                                className={"h-10"}
                                onChange={(e) => {
                                    setHour(e.target.value);
                                }}
                            >
                                <TimeOptions />
                            </select>
                        </div>
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <label htmlFor="name" className={!errorName ? "self-start block" : "self-start block text-red-500" }>{!errorName ? "Nom*" : errorName}</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            onBlur={validateName}
                            onFocus={handleNameFocus}
                        />
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <label htmlFor="email" className={!errorEmail ? "self-start block" : "self-start block text-red-500"}>{!errorEmail ? "Email*" : errorEmail} </label>
                        <input
                            type="email"
                            id="email"
                            className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            onBlur={validateEmail}
                            onFocus={handleEmailFocus}
                        />
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <label htmlFor="numberOfPeople*" className={"self-start block"}>Nombre de pers* (6 max)</label>
                        <input
                            type="number"
                            min="1"
                            max="6"
                            id="numberOfPeople"
                            required
                            className={"w-full h-10 text-start pl-3 border border-[#008080]"}
                            value={people}
                            onChange={(e) => {
                                setPeople(parseInt(e.target.value, 10));
                            }}
                            onFocus={handlePeopleFocus}
                        />
                    </div>
                    <div className={"w-[40%] input-group mt-8 flex flex-col items-center"}>
                        <button
                            className={"w-full h-10 bg-[#008080] hover:bg-[#6B8E23] text-white text-xl font-inter cursor-pointer"}
                            disabled={!allFieldsValid}
                            type="submit"
                        >
                            Réserver
                        </button>
                    </div>
                </form>
            ) : (
                <SuccessMsg closeSuccessMsg={closeSuccessMsg} name={name} people={people} date={currentDate} hour={hour} error={error} />
            )}
        </section>
    );
};

export default BookingForm;
