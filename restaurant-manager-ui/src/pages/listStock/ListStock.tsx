import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";
import {StockItem} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const ListStock = () => {

    const {formattedDate} = useCurrentDate();
    const [stockItems, setStockItems] = useState<StockItem[]>([]);


    useEffect(() => {
        getStock()
    }, []);

    const getStock = async () => {
        try {
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
                <div className={"custom-shadow p-[10px] m-5 mt-0"}>

                   <div className={"w-full flex items-start justify-between"}>
                        <div className={"w-[45%] h-full flex flex-col"}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Plats</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id < 5 && (
                                                        <div key={item.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{item.item_name}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
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
                            <Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Desserts</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id === 5 && (
                                                        <div key={item.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{item.item_name}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
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
                        <div className={"w-[45%] h-full"}>
                            <Accordion>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Boissons froides</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id < 9 && item.cat_id > 5 && (
                                                        <div key={item.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{item.item_name}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
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
                            <Accordion>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Boissons chaudes</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={"w-full h-full"}>
                                            <ul>
                                                {stockItems.map((item) => (
                                                    item.cat_id === 9 && (
                                                        <div key={item.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{item.item_name}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={item.quantity || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
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