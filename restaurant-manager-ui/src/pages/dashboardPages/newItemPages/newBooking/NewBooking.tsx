import TimeOptions from "../../../../components/generalComponents/timeOptions/TimeOptions.tsx";
import {FormEvent, useEffect, useState} from "react";
import {NewBookingData} from "../../../../types/types.ts";
import axiosInstance from "../../../../axios/axiosInstance.tsx";
import {useNotifDispatch} from "../../../../hooks/notifications/useNotifDispatch.tsx";
import useUsername from "../../../../hooks/username/useUsername.tsx";



const NewBooking = (props: NewBookingData) => {

    const dispatch = useNotifDispatch()


    const [currentDate, setCurrentDate] = useState<string>("")
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
        setCurrentDate("")
        setHour("")
        setName("")
        setEmail("")
        setPeople(1)
        setMessage("")
        setSuccess(false)
    }

    const handleEdit = () => {
        setMessage("")
        const booking = props.bookings.find((booking) => booking.id === props.id)
        if (booking) {
            setAdd(false)
            setCurrentDate(booking.date)
            setHour(booking.hour)
            setName(booking.name)
            setEmail(booking.email)
            setPeople(booking.people)
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentDate === "" || hour === "" || name === "" || email === "") {
            setMessage("Tous les champs sont obligatoires")

        } else {
            if (currentDate !== "") {

                const formattedDate = currentDate.split("-").reverse().join("/");
                try {
                    if (add) {
                        await axiosInstance.post("/bookings/admin/addBooking", {
                            date: formattedDate,
                            hour,
                            name,
                            email,
                            people
                        })
                        setSuccess(true)
                        setMessage("La réservation a bien été créée")
                        dispatch({ type: 'ADD_BOOKING_NOTIF'})
                    } else {
                        await axiosInstance.patch(`/bookings/${props.id}`, {
                            date: formattedDate,
                            hour,
                            name,
                            email,
                            people
                        })
                        setSuccess(true)
                        setMessage("La réservation a bien été mise à jour")

                    }

                } catch (error) {
                    console.log(error)
                    setMessage(add ? "L'ajout de la réservationa échoué" : "la mise à jour a échouée")
                }
                setSuccess(true)
                setMessage(add ? "La réservation a bien été créée" : "Les modifications sont enregistrées")

            }
        }
    }

    const handleClose = () => {
        props.onAddOrEdit()
        props.close()
    }

    const {username} = useUsername()

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter une réservation" : "Modifier une réservation"}</h1>
                </div>
                {success ? (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p>
                    </div>
                ) : (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-red-600 text-2xl"}>{message}</p>
                    </div>
                )}
                <div className={"custom-shadow p-[10px] m-5 flex flex-col"}>
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
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
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
                                onChange={(e) => {
                                    setPeople(parseInt(e.target.value, 10));
                                }}
                            />
                        </div>
                        <button
                            type={"submit"}
                            disabled={username === "guest"}
                            className={username !== "guest"? "w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-pointer" : "w-[250px] p-[10px] text-white font-bold mt-[25px] mb-5 bg-[#008080] border-0 rounded-[9px] hover:bg-[#6B8E23] cursor-not-allowed"}
                        >
                            {add ? "Ajouter une réservation" : "Modifier une réservation"}
                        </button>
                    </form>
                </div>
                <div className={"mb-2 pl-6"}>
                    <button
                        className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                        onClick={handleClose}
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        </div>

    );
}
export default NewBooking