import {Link} from "react-router-dom"
import useUsername from "../../hooks/useUsername.tsx";


const DashboardNavbar = () => {


    const { username } = useUsername()

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