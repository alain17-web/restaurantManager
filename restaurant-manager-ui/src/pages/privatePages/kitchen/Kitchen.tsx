import Logo from "../../../components/generalComponents/logo/Logo.tsx";
import Avatar from "../../../components/generalComponents/avatar/Avatar.tsx";
import Notepad from "../../../components/kitchenComponents/notepad/Notepad.tsx";
import useLogout from "../../../hooks/logout/useLogout.tsx";
import useUsername from "../../../hooks/username/useUsername.tsx";
import {Link} from "react-router-dom"



const Kitchen = () => {

    // Destructuring the handleLogout function from the useLogout hook
    const {handleLogout} = useLogout()


    // Destructuring the username, gender, and roleId from the useUsername hook
    const { username,gender, roleId } = useUsername()


    return (
        <section
            className={"w-full h-screen bg-[url('./img/kitchen.jpg')] bg-center bg-no-repeat bg-cover overflow-hidden"}>
            <div className={"w-full flex items-center justify-between mt-4 px-5"}>
                <Logo/>
                <div className={"w-auto flex items-center justify-center gap-3"}>
                    {/* If the user is a guest, show links to the dashboard and restaurant views */}
                    {username === "guest" &&
                        <>
                            <div className={"flex items-center mr-5 pr-1 relative"}>
                                <img src={"./img/dashboard.svg"} width={30} height={30}/>
                                <Link to={'/dashboard'}
                                      className={'text-black text-lg cursor-pointer pl-2'}>Tableaux </Link>
                            </div>
                            <div className={"flex items-center mr-5 pr-1 relative"}>
                                <img src={"./img/restaurant-waiter.svg"} width={30} height={30}/>
                                <Link to={'/restaurant'}
                                      className={'text-black text-lg cursor-pointer pl-1'}>Salle</Link>
                            </div>
                        </>
                    }
                    <p className={"text-2xl text-white font-inter font-semibold italic"}>Bienvenue {username}</p>
                    {/* Avatar component that displays user's avatar based on username, gender, and role */}
                    <Avatar username={username} gender={gender} roleId={roleId}/>
                    <div className={"rounded-full ml-4 p-1.5 bg-white hover:disconnect"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
                             className="bi bi-box-arrow-left cursor-pointer" onClick={handleLogout}
                             viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fillRule="evenodd"
                                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <Notepad/>
        </section>
    );
};
export default Kitchen;