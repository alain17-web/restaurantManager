import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";
import {Dish, Drink, ItemData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const ListStock = () => {

    const {formattedDate} = useCurrentDate();

    const [lastPurchaseId, setLastPurchaseId] = useState<number>(0);
    const [lastOrderId, setLastOrderId] = useState<number>(0);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    //const [purchaseItems,setPurchaseItems] = useState<ItemData[]>([]);



    useEffect(() => {
        getLastPurchaseId();
        getLastOrderId();
    }, []);

    const getLastPurchaseId = async () => {
        try {
            const res = await axiosInstance.get('purchases/lastDeliveredPurchaseId/')
            //console.log(res.data)
            setLastPurchaseId(res.data)
        } catch (error) {
            console.error('Error in getLastPurchaseId', error);
        }
    }

    const getLastOrderId = async () => {
        try{
            const res = await axiosInstance.get('orders/lastValidatedOrderId/')
            console.log(res.data)
            setLastOrderId(res.data)
        }catch(error){
            console.error('Error in getLastOrderId', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (lastPurchaseId !== 0) {
                try {
                    const [dishesRes, drinksRes, purchaseItemsRes] = await Promise.all([
                        axiosInstance.get('/dishes/'),
                        axiosInstance.get('/drinks/'),
                        axiosInstance.get(`/purchaseItems/${lastPurchaseId}`),

                    ]);

                    setDishes(dishesRes.data);
                    setDrinks(drinksRes.data);
                    console.log(purchaseItemsRes.data);
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            }
        }
        fetchData();
    }, [lastPurchaseId]);


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
                                                {dishes.map((dish) => (
                                                    dish.cat_id !== 5 && (
                                                        <div key={dish.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{dish.name} - min:{dish.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    //value={add ? dishQty[dish.id] || 0 : items.find(i => i.name === dish.name)?.qty || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                    //onChange={(e) => handleQtyChange(add ? dish.id : items.find(i => i.name === dish.name)?.id, 'dish', e)}
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
                                                {dishes.map((dish) => (
                                                    dish.cat_id === 5 && (
                                                        <div key={dish.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{dish.name} - min:{dish.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    //value={add ? dishQty[dish.id] || 0 : items.find(i => i.name === dish.name)?.qty || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                    //onChange={(e) => handleQtyChange(add ? dish.id : items.find(i => i.name === dish.name)?.id, 'dish', e)}
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
                                                {drinks.map((drink) => (
                                                    drink.cat_id !== 9 && (
                                                        <div key={drink.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{drink.name} - min:{drink.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    //value={add ? drinkQty[drink.id] || 0 : items.find(i => i.name === drink.name)?.qty || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                    //onChange={(e) => handleQtyChange(add ? drink.id : items.find(i => i.name === drink.name)?.id, 'drink', e)}
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
                                                {drinks.map((drink) => (
                                                    drink.cat_id === 9 && (
                                                        <div key={drink.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{drink.name} - min:{drink.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    //value={add ? drinkQty[drink.id] || 0 : items.find(i => i.name === drink.name)?.qty || 0}
                                                                    className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                    //onChange={(e) => handleQtyChange(add ? drink.id : items.find(i => i.name === drink.name)?.id, 'drink', e)}
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