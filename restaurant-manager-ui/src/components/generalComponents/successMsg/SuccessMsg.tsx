import {SuccessMsgData} from "../../../types/types.ts";


const SuccessMsg = (props: SuccessMsgData) => {

    return (
        <article className={"w-[60%] h-auto border-2 border-[#6B8E23] rounded-xl mt-2 lg:mt-20 p-2 lg:p-5"}>

            {/* "X" button to close the success message */}
            <p
                className={"text-2xl hover:text-3xl hover:text-orange-700 font-bold cursor-pointer"}
                onClick={props.closeSuccessMsg}
            >
                X
            </p>
            {!props.error ?
                <>
                    <p className={"text-center text-base md:text-xl lg:text-3xl text-[#6B8E23] font-inter"}>Merci {props.name}!</p>
                    <p className={"text-center text-sm md:text-lg lg:text-2xl text-[#6B8E23] font-inter md:mt-4 lg:mt-8"}>Votre réservation
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