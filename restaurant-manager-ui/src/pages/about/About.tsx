import Navbar from "../../components/navbar/Navbar.tsx";
import {useState} from "react";
import BookingForm from "../../components/bookingForm/BookingForm.tsx";
import Map from "../../components/map/Map.tsx";
import FooterAbout from "../../components/footerAbout/FooterAbout.tsx";


const About = () => {

    const [isOnAbout] = useState<boolean>(true);
    return (
        <section className={"w-full h-screen overflow-hidden"}>
            <header
                className={"w-full h-[40vh] bg-center bg-no-repeat bg-cover"}
                style={{backgroundImage: `url('./img/oliveTrees.png')`}}
            >
                <Navbar isOnAbout={isOnAbout}/>
                <h2 className={"text-center text-6xl text-white font-inter mt-20"}>Bienvenue</h2>
                <p className={"text-center text-2xl text-amber-100 font-inter italic mt-8"}>Cuisine traditionnelle palestinienne</p>
            </header>
            <main className={"w-full h-[40vh] flex items-center justify-center"}>
                <BookingForm/>
                <section className={"flex-1 h-full"}>
                    <div className={"w-[70%] mx-auto mt-20"}>
                        <Map/>
                    </div>
                </section>
            </main>
            <FooterAbout />
        </section>
    );
};

export default About;