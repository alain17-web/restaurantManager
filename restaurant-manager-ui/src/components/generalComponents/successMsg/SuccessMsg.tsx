
type Props = {
    closeSuccessMsg: () => void;
    name: string
    people: number
    date: string
    hour: string
    error: boolean
};
const SuccessMsg = (props: Props) => {

    return (
        <article className={"w-[60%] h-auto border-2 border-[#6B8E23] rounded-xl mt-20 p-5"}>

            <p
                className={"text-2xl hover:text-3xl hover:text-orange-700 font-bold cursor-pointer"}
                onClick={props.closeSuccessMsg}
            >
                X
            </p>
            {!props.error ?
                <>
                    <p className={"text-center text-3xl text-[#6B8E23] font-inter"}>Merci {props.name}!</p>
                    <p className={"text-center text-2xl text-[#6B8E23] font-inter mt-8"}>Votre réservation
                        pour {props.people} {props.people > 1 ? "personnes" : "personne"} est confirmée. Nous vous
                        accueillons
                        le {props.date} à {props.hour}.</p>
                </> :
                    <>
                        <p className={"text-center text-3xl text-red-500 font-inter"}>La réservation a échouée</p>
                        <p className={"text-center text-xl text-red-500 font-inter"}>Veuillez réessayer plus tard ou contactez-nous au 012/345 67 89</p>
                    </>
                }


        </article>
    );
};

export default SuccessMsg;