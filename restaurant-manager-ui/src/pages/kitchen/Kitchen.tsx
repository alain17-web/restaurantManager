import {Link} from "react-router-dom"
import Logo from "../../components/logo/Logo.tsx";
import {useEffect, useState} from "react";
import Avatar from "../../components/avatar/Avatar.tsx";

const Kitchen = () => {

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [])

    return (
        <section
            className={"w-full h-screen bg-[url('./img/kitchen.jpg')] bg-center bg-no-repeat bg-cover overflow-hidden"}>
            <div className={"w-full flex items-center justify-between mt-4 px-5"}>
                <Logo/>
                <div className={"w-auto flex items-center justify-center gap-3"}>
                <p className={"text-2xl text-white font-inter font-semibold italic"}>Bienvenue {username}</p>
                    <Avatar username={username}/>
                </div>
            </div>
        </section>
    );
};
export default Kitchen;