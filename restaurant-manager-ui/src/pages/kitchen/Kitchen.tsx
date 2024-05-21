import {useNavigate} from "react-router-dom"
import Logo from "../../components/logo/Logo.tsx";
import {useEffect, useState} from "react";
import Avatar from "../../components/avatar/Avatar.tsx";
import Notepad from "../../components/notepad/Notepad.tsx";


const Kitchen = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");



    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("username")
        navigate("/connexion");
    }

    return (
        <section
            className={"w-full h-screen bg-[url('./img/kitchen.jpg')] bg-center bg-no-repeat bg-cover overflow-hidden"}>
            <div className={"w-full flex items-center justify-between mt-4 px-5"}>
                <Logo/>
                <div className={"w-auto flex items-center justify-center gap-3"}>
                    <p className={"text-2xl text-white font-inter font-semibold italic"}>Bienvenue {username}</p>
                    <Avatar username={username}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
                         className="bi bi-box-arrow-left cursor-pointer ml-4" onClick={handleLogout}
                         viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fillRule="evenodd"
                              d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg>
                </div>
            </div>
            <Notepad />
        </section>
    );
};
export default Kitchen;