import {Link} from "react-router-dom"
import BookButton from "../bookButton/BookButton.tsx";
import Logo from "../logo/Logo.tsx";

const Navbar = () => {
    return (
        <nav className={"w-full h-[100px] flex items-center justify-around bg-transparent pt-12"}>

            <Link to={"/"} className={"w-auto h-32 flex items-center justify-between"}>
                <Logo/>
                <h3 className={"font-inter text-[#013220] text-xl italic ml-5"}>La Branche d'Oliver</h3>
            </Link>
            <p className={"text-base text-[#013220] font-inter italic"}>Ouvert tous les jours de midi à 22h30</p>
            <p className={"text-base text-[#013220] font-inter italic"}>010/345 67 89 - Wavre</p>
            <BookButton/>
        </nav>
    );
};

export default Navbar