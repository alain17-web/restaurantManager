import {Link} from "react-router-dom"
import BookButton from "../bookButton/BookButton.tsx";
import Logo from "../logo/Logo.tsx";
import MenuButton from "../menuButton/MenuButton.tsx";

interface Props {
    isOnAbout: boolean;
}

const Navbar = (props:Props) => {
    return (
        <nav className={"w-full h-[100px] flex items-center justify-around bg-transparent pt-12"}>

            <Link to={"/"} className={"w-auto h-32 flex items-center justify-between no-underline"}>
                <Logo/>
                <h3 className={!props.isOnAbout ? "font-inter text-[#013220] text-xl italic ml-5" : "font-inter text-amber-100 text-xl italic ml-5"}>La Branche d'Oliver</h3>
            </Link>
            <p className={!props.isOnAbout ? "text-base text-[#013220] font-inter italic" : "text-base text-amber-100 font-inter italic"}>Ouvert tous les jours de midi à 22h30</p>
            <p className={!props.isOnAbout ? "text-base text-[#013220] font-inter italic" : "text-base text-amber-100 font-inter italic"}>012/345 67 89 - 18 AV Jean Mermoz, Charleroi</p>
            {!props.isOnAbout ? <BookButton/> : <MenuButton />}
        </nav>
    );
};

export default Navbar