import {Link} from "react-router-dom"
import {useEffect, useState} from "react";
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from "../../types/types.ts";

const DashboardNavbar = () => {



    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            console.log("Navbar: No token found")
            return
        } else {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUsername(decodedToken.username)
        }
    }, [username])



    return (
        <div className={"h-16 flex items-center text-[#555] text-base bg-[#ADD8E6] border border-[#D3D3D3]"}>
            <div className={"w-full flex items-center justify-between p-5"}>
                <div className={"flex items-center"}>
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <Link className={"text-lg font-inter decoration-0 italic pl-1"}>Bienvenue {username}</Link>
                    </div>

                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <img src={"./img/restaurant-waiter.svg"} width={20} height={20}/>
                        <Link to={'/restaurant'} className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Salle</Link>
                    </div>
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <img src={"./img/chef.svg"} width={20} height={20}/>
                        <Link to={'/kitchen'} className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Cuisine</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default DashboardNavbar;