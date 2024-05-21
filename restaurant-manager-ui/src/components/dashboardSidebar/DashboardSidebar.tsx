import {Link, NavLink, useLocation} from "react-router-dom"
import classNames from 'classnames'

const DashboardSidebar = () => {

    const location = useLocation()

    return (
        <div className={"flex-1 min-h-screen border-r-[0.5px] border-[#D3D3D3]"}>
            <div className={"h-16 flex items-center justify-center bg-[#ADD8E6]"}>
                <img src={"./img/logo.png"} alt="logo" width="48px" height="48px"/>
                <Link className={"font-inter text-[#013220] decoration-0 italic font-semibold"}>La Branche
                    d'Olivier</Link>
            </div>
            <hr className={'h-0 border-[O.5px] border-[#D3D3D3]'}/>
            <div className={'pl-[10px]'}>
                <ul className={"m-0 p-0 list-none"}>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>GENERAL</p>
                    <NavLink
                        to={location.pathname !== "/dashboard" ? "/dashboard" : "#"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#7451f8"
                                 className="bi bi-bar-chart-fill mr-[10px]" viewBox="0 0 16 16">
                                <path
                                    d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                            </svg>
                            Dashboard
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};
export default DashboardSidebar;