import {Link} from "react-router-dom"
import BookButton from "../bookButton/BookButton.tsx";
import Logo from "../logo/Logo.tsx";
import MenuButton from "../menuButton/MenuButton.tsx";
import {NavbarBoolean} from "../../../types/types.ts";
import useIsLargeScreen from "../../../hooks/screenWidth/largeScreen/useIsLargeScreen.tsx";
import useIsSmallScreen from "../../../hooks/screenWidth/mobileScreen/useIsSmallScreen.tsx";


const Navbar = (props:NavbarBoolean) => {

    //defines a screen >= 1280px calling a hook
    const isLargeScreen = useIsLargeScreen()

    const isSmallScreen = useIsSmallScreen()

    return (
        <nav className={"w-full h-[100px] flex items-center justify-around bg-transparent pt-12"}>

            <Link to={"/"} className={"w-auto h-32 flex items-center justify-between no-underline"}>
                 <Logo/>
                {/* Restaurant name: style changes depending on whether it's on the About page */}
                {!isSmallScreen &&<h3 className={!props.isOnAbout ? "font-inter text-[#013220] text-xl italic ml-5" : "font-inter text-amber-100 text-xl italic ml-5"}>La Branche d'Oliver</h3>}
            </Link>
            {/* Operating hours rendered if screen width >= 1280px and with conditional styling based on the About page status */}
            { isLargeScreen &&
                <p className={!props.isOnAbout ? "text-base text-[#013220] font-inter italic" : "text-base text-amber-100 font-inter italic"}>Ouvert
                    tous les jours de midi à 22h30</p>}
            {/* Contact information rendered if screen width >= 1280px with conditional styling */}
            { isLargeScreen &&
                <p className={!props.isOnAbout ? "text-base text-[#013220] font-inter italic" : "text-base text-amber-100 font-inter italic"}>012/345
                    67 89 - 18 AV Jean Mermoz, Charleroi</p>}
            {/* Display BookButton if not on the About page, otherwise display MenuButton */}
            {!props.isOnAbout ? <BookButton/> : <MenuButton />}
        </nav>
    );
};

export default Navbar