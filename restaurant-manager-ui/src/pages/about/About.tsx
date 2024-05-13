import Navbar from "../../components/navbar/Navbar.tsx";
import {useState} from "react";

const About = () => {

    const [isOnAbout] = useState(true);
    return (
        <section className={"w-full h-screen overflow-hidden"}>
            <header
                className={"w-full h-[40vh] bg-center bg-no-repeat bg-cover"}
                style={{backgroundImage: `url('./img/oliveTrees.png')`}}
            >
                <Navbar isOnAbout={isOnAbout}/>
            </header>
        </section>
    );
};

export default About;