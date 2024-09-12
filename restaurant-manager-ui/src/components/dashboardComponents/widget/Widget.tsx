import {Link} from "react-router-dom"
import {useNotifState} from "../../../hooks/notifications/useNotifState.tsx";
import {useNotifDispatch} from "../../../hooks/notifications/useNotifDispatch.tsx";

// Defining the Props interface to expect a 'type' prop
interface Props {
    type: string
}

// Defining the Data type to structure the data object used in the widget
type Data = {
    title: string;
    link: string;
};


const Widget = (props: Props) => {

    const {orderCount, purchaseCount, bookingCount} = useNotifState()

    // Getting the dispatch function to reset notifications
    const dispatch = useNotifDispatch()

    // Initializing the data object with default empty values
    let data: Data = {title: "", link: ""};


    // Setting the widget's title and link based on the 'type' prop
    switch (props.type) {
        case "commandes":
            data = {
                title: "COMMANDES CLIENTS",
                link: "Voir toutes les commandes",


            };
            break;
        case "reappros":
            data = {
                title: "REAPPROS FOURNISSEURS",
                link: "Voir tous les réappros",

            };
            break;
        case "reservations":
            data = {
                title: "RESERVATIONS",
                link: "Voir toutes les réservations",

            };
            break
        default:
            break;
    }

    // Function to handle the reset of notifications based on the widget type
    const handleReset = () => {
        // Dispatch the appropriate reset action based on the widget's title
       data.title === "COMMANDES CLIENTS" ? dispatch({ type: 'RESET_ORDER_NOTIF'}) :
           data.title === "REAPPROS FOURNISSEURS" ? dispatch({ type: 'RESET_PURCHASE_NOTIF' }) :
               dispatch({ type: 'RESET_BOOKING_NOTIF'})
    }

    return (
        <div className={"flex justify-between flex-1 h-[100px] p-[10px] custom-shadow rounded-[10px]"}>
            <div className={"flex flex-col justify-between relative"}>
                {/* Ternary that renders the appropriate title and bell icon based on the widget type */}
                {data.title === "COMMANDES CLIENTS" ?
                    <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                        {/* Bell icon for order notifications */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path
                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                        </svg>
                        {/* Notification count for orders */}
                        {orderCount > 0  &&
                            <div
                                className={"w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-bold absolute top-[-5px] right-[-5px]"}
                            >
                                {orderCount}
                            </div>
                        }
                    </span>
                    : data.title === "REAPPROS FOURNISSEURS" ?
                        <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                            {/* Bell icon for purchase notifications */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path
                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                            </svg>
                            {/* Notification count for purchases */}
                            {purchaseCount > 0 && orderCount !== null &&
                                <div
                                    className={"w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-bold absolute top-[-5px] right-[-5px]"}
                                >
                                    {purchaseCount}
                                </div>
                            }
                        </span>
                        :
                        <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                            {/* Bell icon for booking notifications */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path
                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                            </svg>
                            {/* Notification count for bookings */}
                            {bookingCount > 0 && bookingCount !== null &&
                                <div
                                    className={"w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-bold absolute top-[-5px] right-[-5px]"}
                                >
                                    {bookingCount}
                                </div>
                            }
                        </span>}
                        <span>
                            {/* Link to view more details about the notifications and to reset notification count to 0 */}
                            <Link
                                onClick={handleReset}
                                className={"text-gray-500 hover:text-purple-600 text-sm font-inter"}
                                to={
                                    data.title === "COMMANDES CLIENTS" ? "/listOrders"
                                        : data.title === "REAPPROS FOURNISSEURS" ? "/listPurchases" : "/listBookings"}
                            >
                                {data.link}
                            </Link>
                        </span>
            </div>
        </div>
    );
};
export default Widget;