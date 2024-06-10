import TimeOptions from "../../components/timeOptions/TimeOptions.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NewBookingData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const NewBooking = (props: NewBookingData) => {

        const [date, setDate] = useState<string>("")
        const [hour, setHour] = useState<string>("")
        const [name, setName] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [people, setPeople] = useState<number>(1);

        const [message, setMessage] = useState<string>("")
        const [success, setSuccess] = useState<boolean>(false);

        const [add, setAdd] = useState<boolean>(true)

        useEffect(() => {
            if (props.id !== null && props.id !== undefined) {
                handleEdit()
            } else {
                resetForm()
            }
        }, [props.id, props.bookings]);

        const resetForm = () => {
            setAdd(true)
            setDate("")
            setHour("")
            setName("")
            setEmail("")
            setPeople(0)
            setMessage("")
            setSuccess(false)
        }

        const handleEdit = () => {
            setMessage("")
            const booking = props.bookings.find((booking) => booking.id === props.id)
            if (booking) {
                setAdd(false)
                setDate(booking.date)
                setHour(booking.hour)
                setName(booking.name)
                setEmail(booking.email)
                setPeople(booking.people)
            }
        }


        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (date === "" || hour === "" || name === "" || email === "" ) {
                setMessage("Tous les champs sont obligatoires")

            } else {
                try{
                    if(add){
                        await axiosInstance.post("/bookings/addBooking", {date, hour, name, email, people})
                        setSuccess(true)
                        setMessage("La réservation a bien été créée" )
                    }else {
                        //update booking
                    }

                } catch(error){
                    console.log(error)
                    setMessage("L'ajout de la réservationa échoué")
                }
                setSuccess(true)
                setMessage(add ? "La réservation a bien été créée" : "Les modifications sont enregistrées")

            }
        }

        const handlePeople = (e: ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e.target.value)
            if (!isNaN(value)) {
                setPeople(value)
            } else {
                setPeople(1)
            }
        }

        return (
            <div className={"w-full flex"}>
                <div className={"flex-[6]"}>
                    <div className={"custom-shadow p-[10px] m-5"}>
                        <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter une réservation" : "Modifier une réservation"}</h1>
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
                                <label className={"flex items-center gap-[10px]"}>Date*</label>
                                <input
                                    className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                    type={"date"}
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className={"w-[75%]"}>
                                <label className={"flex items-center gap-[10px]"}>Heure*</label>
                                <select
                                    className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                    required
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
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
                                <label className={"flex items-center gap-[10px]"}>Nombre de personnes*</label>
                                <input
                                    className={"w-full p-[5px] border-b-[1px] border-gray-500"}
                                    type={"number"}
                                    min="1"
                                    max="6"
                                    required
                                    value={people}
                                    onChange={handlePeople}
                                />
                            </div>
                            <button
                                type={"submit"}
                                className={"w-[250px] p-[10px] text-white font-bold mt-[12px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer"}
                            >
                                {add ? "Ajouter une réservation" : "Modifier une réservation"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
;
export default NewBooking;