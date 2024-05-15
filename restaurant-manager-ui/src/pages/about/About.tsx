import Navbar from "../../components/navbar/Navbar.tsx";
import {useState} from "react";
import BookingForm from "../../components/bookingForm/BookingForm.tsx";


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
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.132060130872!2d4.4701598769975455!3d50.475885171597014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2292241c63e81%3A0x708d0046feef8fd6!2sAv.%20Jean%20Mermoz%2018%2C%206041%20Charleroi!5e0!3m2!1sen!2sbe!4v1715775660761!5m2!1sen!2sbe"
                            width="600" height="450" style={{"border": 0}} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </section>
            </main>
        </section>
    );
};

export default About;