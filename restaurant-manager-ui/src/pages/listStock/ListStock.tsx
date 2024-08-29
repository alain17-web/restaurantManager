import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";
import {Dish, Drink, ItemData, OrderItems} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const ListStock = () => {

    const {formattedDate} = useCurrentDate();

    const [lastPurchaseId, setLastPurchaseId] = useState<number>(0);
    const [lastOrderId, setLastOrderId] = useState<number>(0);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [stock, setStock] = useState<{ [name: string]: number }>({});
    const [purchaseItems, setPurchaseItems] = useState<ItemData[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);




    useEffect(() => {
        getLastPurchaseId();
        getLastOrderId();
    }, []);

    const getLastPurchaseId = async () => {
        try {
            const res = await axiosInstance.get('purchases/lastDeliveredPurchaseId/')
            console.log(res.data)
            setLastPurchaseId(res.data)
        } catch (error) {
            console.error('Error in getLastPurchaseId', error);
        }
    }

    const getLastOrderId = async () => {
        try{
            const res = await axiosInstance.get('orders/lastValidatedOrderId/')
            setLastOrderId(res.data)
        }catch(error){
            console.error('Error in getLastOrderId', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (lastPurchaseId !== 0 && lastOrderId !== 0) {
                try {
                    const [dishesRes, drinksRes, purchaseItemsRes, orderItemsRes] = await Promise.all([
                        axiosInstance.get('/dishes/'),
                        axiosInstance.get('/drinks/'),
                        axiosInstance.get(`/purchaseItems/${lastPurchaseId}`),
                        axiosInstance.get(`/orderItems/${lastOrderId}`),
                    ]);

                    setDishes(dishesRes.data);
                    setDrinks(drinksRes.data);
                    setPurchaseItems(Array.isArray(purchaseItemsRes.data.purchaseItem) ? purchaseItemsRes.data.purchaseItem : []);
                    setOrderItems(Array.isArray(orderItemsRes.data.orderItem) ? orderItemsRes.data.orderItem : []);
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            }
        };
        fetchData();
    }, [lastPurchaseId, lastOrderId]);

    useEffect(() => {

        if (purchaseItems.length > 0 && orderItems.length > 0) {
            const initialStock: { [name: string]: number } = {};

            const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');


            purchaseItems.forEach((item) => {
                const normalizedName = normalizeName(item.name);
                initialStock[normalizedName] = (initialStock[normalizedName] || 0) + item.qty;
            });

            console.log("Initial Stock:", initialStock);


            orderItems.forEach((item) => {
                const normalizedName = normalizeName(item.name);
                if (initialStock[normalizedName]) {
                    initialStock[normalizedName] -= 1;
                    console.log(`Subtracting 1 from ${item.name}, new stock: ${initialStock[normalizedName]}`);
                } else {
                    console.log(`Item not found in stock: ${item.name}`);
                }
            });

            console.log("Stock after orders:", initialStock);


            setStock(initialStock);
        }
    }, [purchaseItems, orderItems]);

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
                                                                    value={stock[dish.name.trim().toLowerCase()] || 0}
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
                                                {dishes.map((dish) => (
                                                    dish.cat_id === 5 && (
                                                        <div key={dish.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{dish.name} - min:{dish.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={stock[dish.name.trim().toLowerCase()] || 0}
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
                                                {drinks.map((drink) => (
                                                    drink.cat_id !== 9 && (
                                                        <div key={drink.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{drink.name} - min:{drink.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={stock[drink.name.trim().toLowerCase()] || 0}
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
                                                {drinks.map((drink) => (
                                                    drink.cat_id === 9 && (
                                                        <div key={drink.id}>
                                                            <li className={"text-base flex items center justify-between font-inter"}
                                                            >{drink.name} - min:{drink.min}
                                                                <input
                                                                    type={"number"}
                                                                    min={"0"}
                                                                    value={stock[drink.name.trim().toLowerCase()] || 0}
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