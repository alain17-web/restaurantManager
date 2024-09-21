import Logo from "../logo/Logo.tsx";
import {Props} from "../../../types/types.ts"
import useIsLargeScreen from "../../../hooks/screenWidth/largeScreen/useIsLargeScreen.tsx";

// Retrieve the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_IMG_URL;

const DishPopup = (props:Props) => {

    const imgUrl = `${apiBaseUrl}/uploads/img/${props.dishImg}`

    //defines a screen >= 1280px calling a hook
    const isLargeScreen = useIsLargeScreen()

    return (
        // Section for the popup, styled as a fixed modal centered on the screen
        <section className={isLargeScreen ? "bg-[#000000d3] opacity-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 border border-[#ffffffde] rounded-md w-[50%] h-auto mb-20 p-10" : "w-full h-screen bg-[#000000d3]"}>
            <article className={"flex items-center justify-between px-5"}>
                {isLargeScreen && <Logo/>}
                <h1 className={"text-[#ffffffde] text-xl md:text-2xl text-center font-inter italic  font-semibold my-5"}>{props.dishName}
                    <span> - {props.dishPrice}€</span></h1>

                {/* Close button that triggers the closePopup function passed as a prop */}
                <p
                    className={"text-[#ffffffde] font-extrabold text-3xl cursor-pointer"}
                    onClick={props.closePopup}
                >
                    X
                </p>
            </article>
            <article className={isLargeScreen ? "flex flex-col items-center justify-center w-full gap-5 my-5" : "flex flex-col items-center justify-center w-full my-2"}>
                <img src={imgUrl} alt={props.dishName} />
                <p className={"text-[#ffffffde] text-base  lg:text-xl font-inter italic px-3 "}>{props.dishDesc}</p>
                {/* Display allergens information if it exists */}
                <p className={"text-[#ffffffde] text-base lg:text-xl font-inter italic px-3"}>{props.dishAllerg ? `Allergènes: ${props.dishAllerg}`: ""}</p>
            </article>
        </section>
    );
};
export default DishPopup;