import Navbar from "../../components/navbar/Navbar.tsx";
import {useState} from "react";
import BookingForm from "../../components/bookingForm/BookingForm.tsx";
import Map from "../../components/map/Map.tsx";


const About = () => {

    const [isOnAbout] = useState<boolean>(true);
    return (
        <section className={"w-full h-screen overflow-hidden"}>
            <header
                className={"w-full h-[40vh] bg-center bg-no-repeat bg-cover"}
                style={{backgroundImage: `url('./img/oliveTrees.png')`}}
            >
                <Navbar isOnAbout={isOnAbout}/>
            </header>
            <main className={"w-full h-[45vh] flex items-center justify-center"}>
                <BookingForm/>
                <section className={"flex-1 h-full"}>
                    <div className={"w-[70%] mx-auto mt-20"}>
                        <Map/>
                    </div>
                </section>
            </main>
        </section>
    );
};

export default About;