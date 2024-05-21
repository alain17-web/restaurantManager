import {useNavigate} from "react-router-dom"
import Logo from "../../components/logo/Logo.tsx";
import {useEffect, useState} from "react";
import Avatar from "../../components/avatar/Avatar.tsx";


const Kitchen = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");

    const [isValidated, setIsValidated] = useState<boolean>(false);

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

    const handleValidate = () => {
        setIsValidated(!isValidated);
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
            <main
                className={"w-[500px] h-[900px] bg-[url('./img/bloc-notes.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center ml-20"}>

                {!isValidated ? (
                    <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                        <h1 className={"text-xl font-inter mt-22"}>Commande n°22 : 6 pers</h1>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Plats :</h2>
                        <p className={'text-base font-inter'}>1 Assiette Artichauts</p>
                        <p className={'text-base font-inter'}>1 Assortiment Mixte Grill</p>
                        <p className={'text-base font-inter'}>1 Plateau végétarien</p>
                        <p className={'text-base font-inter'}>1 Assiette Falafel d'Akko</p>
                        <p className={'text-base font-inter'}>1 Assiette Kebbeh d'Arraba</p>
                        <p className={'text-base font-inter'}>1 Assiette Chich Taouk</p>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Desserts :</h2>
                        <p className={'text-base font-inter'}>2 Aish el saraya</p>
                        <p className={'text-base font-inter'}>2 Baklava</p>
                        <p className={'text-base font-inter'}>1 Namoura</p>
                        <p className={'text-base font-inter'}>1 Chyabat achta</p>
                    </div>
                ) : (
                    <div className={"w-full h-auto mt-3 flex flex-col items-center justify-center"}>
                        <h2 className={"text-xl text-green-600 font-inter font-semibold italic"}>Commande 22
                            validée</h2>
                        <h2 className={"text-lg font-inter font-semibold italic"}>Pas d'autre commande en attente</h2>
                    </div>
                )}
                <button
                    className={"w-[80%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                    onClick={handleValidate}
                >
                    {!isValidated ? "Valider" : "Reset"}

                </button>
            </main>
        </section>
    );
};
export default Kitchen;