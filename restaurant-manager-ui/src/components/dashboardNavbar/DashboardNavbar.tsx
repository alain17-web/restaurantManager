import {Link, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";

const DashboardNavbar = () => {

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
        <div className={"h-12 flex items-center text-[#555] text-base bg-[#ADD8E6] border border-[#D3D3D3]"}>
            <div className={"w-full flex items-center justify-between p-5"}>
                <div className={"flex items-center"}>
                    <div className={"flex items-center mr-5 pr-1 relative"}>

                        <Link className={"font-inter decoration-0 italic pl-1"}>Bienvenue {username}</Link>
                    </div>
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <img src={"./img/restaurant-waiter.svg"} width={20} height={20}/>
                        <Link to={'/restaurant'} className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Salle</Link>
                    </div>
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <img src={"./img/chef.svg"} width={20} height={20}/>
                        <Link to={'/kitchen'} className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Cuisine</Link>
                    </div>
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-box-arrow-left cursor-pointer" onClick={handleLogout}
                             viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fillRule="evenodd"
                                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                        <Link className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardNavbar;