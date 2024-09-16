import DashboardSidebar from "../../../../components/dashboardComponents/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../../../components/dashboardComponents/dashboardNavbar/DashboardNavbar.tsx";
import {useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import useCurrentDate from "../../../../hooks/date/useCurrentDate.tsx";
import {StockItem} from "../../../../types/types.ts";
import axiosInstance from "../../../../axios/axiosInstance.tsx";



const ListStock = () => {

    // Get the formatted date (DD/MM/YYYY) using the useCurrentDate hook
    const {formattedDate} = useCurrentDate();

    const [stockItems, setStockItems] = useState<StockItem[]>([]);

    // useEffect hook to fetch stock items when the component mounts
    useEffect(() => {
        getStock()
    }, []);

    const getStock = async () => {
        try {
            // Make a GET request to the '/stock/' endpoint to fetch stock data
            const res = await axiosInstance.get('/stock/')
            setStockItems(res.data)
        } catch (error) {
            console.error('Error in getStock', error);
        }
    }

    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Stock au {formattedDate}</h1>

                {/* Container for the stock list */}
                <div className={"custom-shadow p-[10px] m-5 mt-0"}>

                   <div className={"w-full flex items-start justify-between"}>
                       {/* Left column: Plats and Desserts */}
                        <div className={"w-[45%] h-full flex flex-col"}>
                            {/* Accordion for "Plats" category */}
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Plats</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {/* Loop through stockItems and display items with cat_id < 5 (Plats) */}
                                                {stockItems.map((item) => (
                                                    item.cat_id < 5 && (
                                                        <div key={item.id}>
                                                            <li className={item.quantity >= 10 ?"text-base flex items center justify-between font-inter" : "text-base text-red-500 flex items center justify-between font-inter"}
                                                            >{item.item_name} - min:10
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={item.quantity >= 10 ?"w-16 h-6 pl-6 border-1 border-slate-400" : "w-16 h-6 pl-6 border-1 border-slate-400 text-red-500"}
                                                                    readOnly={true}
                                                                />
                                                            </li>
                                                            <hr/>
                                                        </div>)
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* Accordion for "Desserts" category */}
                            <Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Desserts</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id === 5 && (
                                                        <div key={item.id}>
                                                            <li className={item.quantity >= 10 ?"text-base flex items center justify-between font-inter" : "text-base text-red-500 flex items center justify-between font-inter"}
                                                            >{item.item_name} - min:10
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={item.quantity >= 10 ?"w-16 h-6 pl-6 border-1 border-slate-400" : "w-16 h-6 pl-6 border-1 border-slate-400 text-red-500"}
                                                                    readOnly={true}
                                                                />
                                                            </li>
                                                            <hr/>
                                                        </div>)
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                       {/* Right column: Boissons froides and Boissons chaudes */}
                        <div className={"w-[45%] h-full"}>
                            {/* Accordion for "Boissons froides" category */}
                            <Accordion>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Boissons froides</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id < 9 && item.cat_id > 5 && (
                                                        <div key={item.id}>
                                                            <li className={item.quantity >= 10 ?"text-base flex items center justify-between font-inter" : "text-base text-red-500 flex items center justify-between font-inter"}
                                                            >{item.item_name} - min:10
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={item.quantity >= 10 ?"w-16 h-6 pl-6 border-1 border-slate-400" : "w-16 h-6 pl-6 border-1 border-slate-400 text-red-500"}
                                                                    readOnly={true}
                                                                />
                                                            </li>
                                                            <hr/>
                                                        </div>)
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* Accordion for "Boissons chaudes" category */}
                            <Accordion>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Boissons chaudes</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id === 9 && (
                                                        <div key={item.id}>
                                                            <li className={item.quantity >= 10 ?"text-base flex items center justify-between font-inter" : "text-base text-red-500 flex items center justify-between font-inter"}
                                                            >{item.item_name} - min:10
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={item.quantity >= 10 ?"w-16 h-6 pl-6 border-1 border-slate-400" : "w-16 h-6 pl-6 border-1 border-slate-400 text-red-500"}
                                                                    readOnly={true}
                                                                />
                                                            </li>
                                                            <hr/>
                                                        </div>)
                                                ))}
                                            </ul>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ListStock;