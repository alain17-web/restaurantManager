import Logo from "../logo/Logo.tsx";
import {Props} from "../../types/types.ts"



const DishPopup = (props:Props) => {
    return (
        <section className={"bg-[#000000d3] opacity-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 border border-[#ffffffde] rounded-md w-[50%] h-auto mb-20 p-10"}>
            <article className={"flex items-center justify-between px-5"}>
                <Logo/>
                <h1 className={"text-[#ffffffde] text-2xl text-center font-inter italic  font-semibold my-5"}>{props.dishName}
                    <span> - {props.dishPrice}€</span></h1>
                <p
                    className={"text-[#ffffffde] font-extrabold text-3xl cursor-pointer"}
                    onClick={props.closePopup}
                >
                    X
                </p>
            </article>
            <article className={"flex flex-col items-center justify-center w-full gap-5 my-5"}>
                <img src={props.dishImg} alt={props.dishName}/>
                <p className={"text-[#ffffffde]  text-xl font-inter italic px-3"}>{props.dishDesc}</p>
                <p className={"text-[#ffffffde]  text-xl font-inter italic px-3"}>{props.dishAllerg ? `Allergènes: ${props.dishAllerg}`: ""}</p>
            </article>
        </section>
    );
};
export default DishPopup;