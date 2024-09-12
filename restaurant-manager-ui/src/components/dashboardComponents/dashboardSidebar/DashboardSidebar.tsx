import {Link, NavLink, useLocation} from "react-router-dom"
import classNames from 'classnames'
import useLogout from "../../../hooks/logout/useLogout.tsx";
import {useNotifDispatch} from "../../../hooks/notifications/useNotifDispatch.tsx";

const DashboardSidebar = () => {

    // Hook to get the current route location (used for dynamic active links)
    const location = useLocation()

    // Destructuring the handleLogout function from the useLogout hook
    const { handleLogout } = useLogout();

    // Getting the dispatch function from the notification hook
    const dispatch = useNotifDispatch()

    return (
        <div className={"flex-1 min-h-screen border-r-[0.5px] border-[#D3D3D3]"}>
            <div className={"h-16 flex items-center justify-center bg-[#87A96B]"}>
                <img src={"./img/logo.png"} alt="logo" width="48px" height="48px"/>
                <Link className={"font-inter text-[#013220] decoration-0 italic font-semibold"}>La Branche
                    d'Olivier</Link>
            </div>
            <hr className={'h-0 border-[O.5px] border-[#D3D3D3]'}/>

            {/* Navigation section */}
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
                    <NavLink
                        to={"/listRosters"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/roster.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Horaires staff
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
                        onClick={() => dispatch({type: 'RESET_ORDER_NOTIF'})}
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
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>REAPPROS</p>
                    <NavLink
                        onClick={() => dispatch({type: 'RESET_PURCHASE_NOTIF'})}
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
                            En attente
                        </li>
                    </NavLink>
                    <NavLink
                        to={"/listDeliveredPurchases"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/delivered.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Livrés
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>STOCK</p>
                    <NavLink
                        to={"/listStock"}
                        className={({isActive}: { isActive: boolean }) =>
                            classNames('no-underline', {
                                'text-gray-500': !isActive,
                                'text-purple-600': isActive,
                            })
                        }
                    >
                        <li className={"flex items-center p-1.5 cursor-pointer"}>
                            <img src={'./img/freezer.svg'} width={25} height={25} className={'mr-[10px]'}/>
                            Stock
                        </li>
                    </NavLink>
                    <p className={"text-base text-[#999] mt-[15px] mb-[15px] font-inter font-bold"}>RESERVATIONS</p>
                    <NavLink
                        onClick={() => dispatch({type: 'RESET_BOOKING_NOTIF'})}
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
                        to={"/listFinances"}
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

                    {/* Logout section */}
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