import Navbar from "../../../components/generalComponents/navbar/Navbar.tsx";
import {useState} from "react";
import BookingForm from "../../../components/generalComponents/bookingForm/BookingForm.tsx";
import Map from "../../../components/generalComponents/map/Map.tsx";
import FooterAbout from "../../../components/generalComponents/footerAbout/FooterAbout.tsx";
import useIsLargeScreen from "../../../hooks/screenWidth/largeScreen/useIsLargeScreen.tsx";


const About = () => {

    //isOnAbout is set to true and passed down to the Navbar as this information determine the style of the bookButton component included in the Navbar
    const [isOnAbout] = useState<boolean>(true);

    //defines a screen >= 1280px calling a hook
    const isLargeScreen = useIsLargeScreen()

    return (
        <section className={"w-full h-screen overflow-hidden"}>
            <header
                className={"w-full h-[40vh] bg-center bg-no-repeat bg-cover"}
                style={{backgroundImage: `url('./img/oliveTrees.png')`}}
            >
                <Navbar isOnAbout={isOnAbout}/>
                <h2 className={"text-center text-2xl md:text-4xl lg:text-6xl text-white font-inter mt-20"}>La Branche d'Olivier</h2>
                <p className={"text-center text-sm md:text-base lg:text-2xl text-amber-100 font-inter italic mt-4 lg:mt-8"}>Cuisine traditionnelle palestinienne</p>
            </header>
            <main className={ "w-full h-[40vh] flex items-center justify-center"}>
                <BookingForm/>
                {isLargeScreen && <section className={"flex-1 h-full"}>
                    <div className={"w-[70%] mx-auto mt-20"}>
                        <Map/>
                    </div>
                </section>}
            </main>
            <FooterAbout />
        </section>
    );
};

export default About;