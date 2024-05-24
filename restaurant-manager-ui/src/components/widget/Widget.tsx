import {Link} from "react-router-dom"

interface Props {
    type: string
}

type Data = {
    title: string;
    link: string;
};


const Widget = (props: Props) => {

    let data: Data = { title: "", link: "" };


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

    return (
        <div className={"flex justify-between flex-1 h-[100px] p-[10px] custom-shadow rounded-[10px]"}>
            <div className={"flex flex-col justify-between relative"}>
                {data.title === "COMMANDES CLIENTS" ?
                    <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                        </svg>
                        <div className={"w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-bold absolute top-[-5px] right-[-5px]"}
                        >1
                        </div>
                    </span>
                    : data.title === "REAPPROS FOURNISSEURS" ?
                        <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                            </svg>
                        </span>
                        : <span className={"flex items-center text-gray-500 text-base font-inter font-bold"}>{data.title}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-bell ml-[60px]" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                            </svg>
                        </span>}
                <span ><Link className={"text-gray-500 hover:text-purple-600 text-sm font-inter"} to={data.title ==="COMMANDES CLIENTS" ? "/listOrders" : data.title === "REAPPROS FOURNISSEURS" ? "/listPurchases" : "#"}>{data.link}</Link></span>
            </div>
        </div>
    );
};
export default Widget;