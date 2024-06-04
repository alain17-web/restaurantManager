import {Link, NavLink, useLocation, useNavigate} from "react-router-dom"
import classNames from 'classnames'

const DashboardSidebar = () => {

    const location = useLocation()

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username")
        navigate("/connexion");
    }

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
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/dashboard.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Dashboard
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>STAFF</p>
                    <NavLink
                        to={"/listActive"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/people.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Employés Actifs
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listInactive"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/unfollow.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Inactifs
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listRoles"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/role.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Rôles
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>MENU</p>
                    <NavLink
                        to={'/listDishes'}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/dish.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Plats
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listDrinks"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/glass.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Boissons
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listCategories"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/category.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Catégories
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>COMMANDES</p>
                    <NavLink
                        to={"/listOrders"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/clientOrder.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Commandes Clients
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listPurchases"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/purchase-order.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Réappros Fournisseurs
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>STOCK</p>
                    <NavLink
                        to={"/listStockFood"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/freezer.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Stock Nourriture
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listStockDrinks"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/bottles.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Stock Boissons
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>RESERVATIONS</p>
                    <NavLink
                        to={"/listBookings"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/booking.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Confirmées
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>FINANCES</p>
                    <NavLink
                        to={location.pathname !== "/dashboard" ? "/dashboard" : "#"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/euro.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Comptabilité
                        </li>
                    </NavLink>
                    <li className={'flex items-center p-1.5 cursor-pointer mt-10'} onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-box-arrow-left mr-[10px] cursor-pointer"
                             viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fillRule="evenodd"
                                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                        <Link
                            className={'text-[#555] hover:text-red-400 text-lg decoration-0 cursor-pointer pl-1 font-semibold'}>Déconnexion</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default DashboardSidebar;