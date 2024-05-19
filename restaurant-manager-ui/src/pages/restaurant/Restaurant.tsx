import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import TimeDisplay from "../../components/timeDisplay/TimeDisplay.tsx";



const Restaurant = () => {

    const navigate = useNavigate()

    const [username,setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if(storedUsername){
            setUsername(storedUsername);
        }
    },[])

    const handleLogout = () => {
        localStorage.removeItem("username")
        navigate("/connexion");
    }

    const handleNewOrder = () => {

    }

    return (
        <section className={"w-full h-screen overflow-hidden flex items-center justify-center"} style={{
            backgroundImage: "url('./img/resto2.jpg')",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "rgba(255, 255, 255, 1)"
        }}>

            <div
                className={"w-[500px] h-[900px] bg-[url('./img/vTablet.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center z-20"}>
                <div
                    className={"w-[92%] h-[82%] bg-[url('./img/scenery.jpg')] bg-center bg-no-repeat bg-cover flex flex-col justify-between"}>
                    <div className={"w-full h-auto flex items-start justify-between px-4"}>
                        <img src={'./img/logo.png'} alt="logo restaurant" width={'60px'} height={'60px'}/>
                        <div className={"w-auto flex items-center justify-center gap-3"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-wifi" viewBox="0 0 16 16">
                                <path
                                    d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049"/>
                                <path
                                    d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-battery-half" viewBox="0 0 16 16">
                                <path d="M2 6h5v4H2z"/>
                                <path
                                    d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8"/>
                            </svg>
                            {/*<Link to={'../connexion'}>*/}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     className="bi bi-box-arrow-left cursor-pointer" onClick={handleLogout} viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path fillRule="evenodd"
                                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>
                            {/*</Link>*/}
                        </div>
                    </div>
                    <TimeDisplay />
                    <h2 className={"text-center text-white text-2xl font-inter italic"}>Bienvenue {username}</h2>
                    <button
                        className={"w-[50%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                        onClick={handleNewOrder}
                    >
                        Nouvelle commande
                    </button>
                    <div className={"w-auto flex items-center justify-end gap-3 px-4"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                             className="bi bi-volume-off" viewBox="0 0 16 16">
                            <path
                                d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M10 5.04 8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-toggle2-off" viewBox="0 0 16 16">
                            <path d="M9 11c.628-.836 1-1.874 1-3a4.98 4.98 0 0 0-1-3h4a3 3 0 1 1 0 6z"/>
                            <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>

    )
        ;
};
export default Restaurant;