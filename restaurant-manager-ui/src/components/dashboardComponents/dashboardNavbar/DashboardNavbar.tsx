import {Link} from "react-router-dom"
import useUsername from "../../../hooks/username/useUsername.tsx";


const DashboardNavbar = () => {

    // Destructuring the 'username' from the custom hook 'useUsername'
    const { username } = useUsername()

    return (
        <div className={"h-16 flex items-center text-[#555] text-base bg-[#87A96B] border border-[#D3D3D3]"}>
            <div className={"w-full flex items-center justify-between p-5"}>
                <div className={"flex items-center"}>
                    {/* Welcome message displaying the username */}
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <Link className={"text-lg font-inter decoration-0 italic pl-1"}>Bienvenue {username}</Link>
                    </div>

                    {/* First section with a link to the restaurant  */}
                    <div className={"flex items-center mr-5 pr-1 relative"}>
                        <img src={"./img/restaurant-waiter.svg"} width={20} height={20}/>
                        <Link to={'/restaurant'} className={'text-[#555] decoration-0 cursor-pointer pl-1'}>Salle</Link>
                    </div>

                    {/* Second section with a link to the kitchen */}
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