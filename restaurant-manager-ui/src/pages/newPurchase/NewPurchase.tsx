
import {Dish, Drink, ItemData, NewPurchaseData} from "../../types/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import useCurrentDate from "../../hooks/date/useCurrentDate";
import Accordion from 'react-bootstrap/Accordion';
import { useNotifDispatch } from "../../hooks/notifications/useNotifDispatch";
import Form from 'react-bootstrap/Form';
import useTotalOnHand from "../../hooks/totalOnHand/useTotalOnHand.tsx";


const NewPurchase = (props: NewPurchaseData) => {
    const dispatch = useNotifDispatch();

    const [max, setMax] = useState<number>(0);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [items, setItems] = useState<any[]>([]);

    const [dishQty, setDishQty] = useState<{ [key: number]: number }>({});
    const [drinkQty, setDrinkQty] = useState<{ [key: number]: number }>({});


    const [purchase_date, setPurchase_date] = useState<string>("");
    const [purchase_id, setPurchase_id] = useState<number | null>(null);
    const [totalPurchase, setTotalPurchase] = useState<number>(0);
    const [delivery_date, setDelivery_date] = useState<string>("");


    const [message, setMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(true);

    const { formattedDate } = useCurrentDate();
    const { totalOnHand} = useTotalOnHand();

    useEffect(() => {
        if(totalOnHand !== undefined && totalOnHand !== 0) {
            setMax(totalOnHand );
        }

    }, [totalOnHand]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dishesRes, drinksRes] = await Promise.all([
                    axiosInstance.get('/dishes/'),
                    axiosInstance.get('/drinks/')
                ]);

                setDishes(dishesRes.data);
                setDrinks(drinksRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleQtyChange = (id: number, type: 'dish' | 'drink', event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            if (type === 'dish') {
                setDishQty((prevDishQty) => ({ ...prevDishQty, [id]: value }));
                if (!add) {
                    setItems(items.map(item => item.id === id ? { ...item, qty: value } : item));
                }
            } else if (type === 'drink') {
                setDrinkQty((prevDrinkQty) => ({ ...prevDrinkQty, [id]: value }));
                if (!add) {
                    setItems(items.map(item => item.id === id ? { ...item, qty: value } : item));
                }
            }
        }
    };

    useEffect(() => {
        const calculateTotal = () => {
            const dishTotal = Object.keys(dishQty).reduce((sum, key) => {
                const dishId = parseInt(key, 10);
                const dishQuantity = dishQty[dishId];
                const dish = dishes.find(d => d.id === dishId);
                return sum + (dish ? dish.cost * dishQuantity : 0);
            }, 0);

            const drinkTotal = Object.keys(drinkQty).reduce((sum, key) => {
                const drinkId = parseInt(key, 10);
                const drinkQuantity = drinkQty[drinkId];
                const drink = drinks.find(d => d.id === drinkId);
                return sum + (drink ? drink.cost * drinkQuantity : 0);
            }, 0);

            const newTotal = dishTotal + drinkTotal;
            setTotalPurchase(parseFloat(newTotal.toFixed(2)));
            setPurchase_date(formattedDate);
            setDelivery_date("en attente");
        };

        calculateTotal();
    }, [dishQty, drinkQty, dishes, drinks]);

    useEffect(() => {
        const handleEdit = async () => {
            setMessage("");

            const purchase = props.purchases.find((purchase) => purchase.purchase_id === props.purchase_id);
            if (purchase) {
                setAdd(false);
                setDelivery_date(purchase.delivery_date);
                setPurchase_id(purchase.purchase_id);

                try {
                    const res = await axiosInstance.get(`/purchaseItems/${purchase.purchase_id}`);
                    const purchaseItems = res.data.purchaseItem;

                    const itemsData = purchaseItems.map((item: ItemData) => ({
                        id: item.id,
                        name: item.name,
                        qty: item.qty,
                        type: item.type,
                        cost: item.cost
                    }));

                    setItems(itemsData);


                    const dishQuantities = itemsData.filter((item: ItemData) => item.type === "plats" || item.type === "desserts").reduce((acc:{[key:number]:number}, item: ItemData) => {
                        acc[item.id] = item.qty;
                        return acc;
                    }, {} as { [key: number]: number });

                    const drinkQuantities = itemsData.filter((item: ItemData) => item.type === "boissons froides" || item.type === "boissons chaudes").reduce((acc:{[key:number]:number}, item:ItemData) => {
                        acc[item.id] = item.qty;
                        return acc;
                    }, {} as { [key: number]: number });

                    setDishQty(dishQuantities);
                    setDrinkQty(drinkQuantities);
                } catch (error) {
                    console.error("Error fetching purchase items", error);
                }
            }
        };

        if (props.purchase_id !== null && props.purchase_id !== undefined) {
            handleEdit();
        } else {
            setAdd(true);
            setMessage("");
            setSuccess(false);
            setDishQty({});
            setDrinkQty({});
        }
    }, [props.purchase_id, props.purchases]);

    useEffect(() => {
        if (!add) {
            const dishTotal = items.filter(item => item.type === "plats" || item.type === "desserts").reduce((sum, item) => sum + item.cost * item.qty, 0);
            const drinkTotal = items.filter(item => item.type === "boissons froides" || item.type === "boissons chaudes").reduce((sum, item) => sum + item.cost * item.qty, 0);
            setTotalPurchase(dishTotal + drinkTotal);
        }
    }, [items, add]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const purchase = {
            purchase_date,
            totalPurchase,
            delivery_date,
        };

        try {
            if (add) {
                const purchaseRes = await axiosInstance.post('/purchases/addPurchase', purchase);
                const purchaseId = purchaseRes.data.purchaseResult.purchase_id;
                if (purchaseId) {
                    const purchaseItems = [
                        ...dishes.map(item => ({
                            purchase_id: purchaseId,
                            name: item.name,
                            type: item.cat_id !== 5 ? "plats" : "desserts",
                            cost: item.cost,
                            qty: dishQty[item.id] || 0,
                            delivery_date,
                        })),
                        ...drinks.map(item => ({
                            purchase_id: purchaseId,
                            name: item.name,
                            type: item.cat_id !== 9 ? "boissons froides" : "boissons chaudes",
                            cost: item.cost,
                            qty: drinkQty[item.id] || 0,
                            delivery_date,
                        })),
                    ];

                    for (const purchaseItem of purchaseItems) {
                        await axiosInstance.post('/purchaseItems/addPurchaseItem', purchaseItem);
                    }
                    setSuccess(true);
                    setMessage("Le réappro a été envoyé");
                    dispatch({ type: 'ADD_PURCHASE_NOTIF' });
                }
            } else if (purchase_id && delivery_date !== "en attente") {
                const updateData = items.map(item => ({
                    id: item.id,
                    delivery_date: item.delivery_date
                }));
                try{
                    for (const item of updateData) {
                        await axiosInstance.patch(`/purchaseItems/updateDelDate/${purchase_id}/${item.id}`, {delivery_date})
                    }
                    await axiosInstance.patch(`/purchases/updateDelDate/${purchase_id}`, { delivery_date });
                    const total_on_hand = max - totalPurchase
                   await axiosInstance.post('/finances/addFinanceSummary',{purchase_id,purchase_date,totalPurchase,total_on_hand})

                    for (const item of items) {
                        const quantity = item.qty;
                        await axiosInstance.patch('/stock/updateStock', {
                            item_name: item.name,
                            quantity: quantity
                        });
                    }

                    setSuccess(true);
                    setMessage("Le réappro a été réceptionné")
                }catch(error){
                    console.error("Error updating delivery_date", error);
                    setMessage("Le réappro n'a pas pu être réceptionné")
                    setSuccess(false);
                }

            } else if (purchase_id && delivery_date === "en attente" && totalPurchase !== 0) {
                const updateData = items.map(item => ({
                    id: item.id,
                    qty: item.qty
                }));

                try {
                    for (const item of updateData) {
                        await axiosInstance.patch(`/purchaseItems/updateQty/${purchase_id}/${item.id}`, { qty: item.qty });
                    }
                    await axiosInstance.patch(`/purchases/updateTotal/${purchase_id}`, { totalPurchase });
                    setSuccess(true);
                    setMessage("Les quantités et le total ont été modifiées");
                } catch (error) {
                    console.error('Error updating quantities or total:', error);
                    setMessage("La modification du réappro a échoué");
                    setSuccess(false);
                }
            }
        } catch (error) {
            console.error("Error creating new purchase", error);
            setMessage(add ? "La création du réappro a échoué" : "La modification du réappro a échoué");
            setSuccess(false);
        }
    };

    const handleClose = () => {
        props.onAddOrEdit()
        props.close()
    }

    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un réappro -" : "Modifier un réappro -"}<span
                        className={"font-bold"}> Montant maximum : {max.toFixed(2)}€ - Livraison: {delivery_date}</span>
                    </h1>
                </div>
                {success ? (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-green-600 text-2xl"}>{message}</p>
                    </div>
                ) : (
                    <div className={"p-2 h-4 m-5 text-center"}>
                        <p className={"text-red-600 text-2xl"}>{message}</p>
                    </div>
                )}
                <div className={"flex justify-between mr-20 text-2xl"}>
                    {delivery_date === "en attente" ?
                        <Form.Check
                            className={"text-lg ml-16"}
                            type="switch"
                            label="Livrée ?"
                            onChange={() => setDelivery_date(formattedDate)}
                        /> : <p className={"pl-15 font-inter text-slate-600"}>Livrée</p>}
                    <p className={"pl-15 font-inter text-slate-600"}>TOTAL: {totalPurchase.toFixed(2)}€</p>
                </div>
                <div className={"custom-shadow p-[10px] m-5 mt-0"}>
                    <form className={"w-full"} onSubmit={handleSubmit}>
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
                                                                >{dish.name} - {dish.cost} € - min:{dish.min}
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={add ? dishQty[dish.id] || 0 : items.find(i => i.name === dish.name)?.qty || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleQtyChange(add ? dish.id : items.find(i => i.name === dish.name)?.id, 'dish', e)}
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
                                                                >{dish.name} - {dish.cost} € - min:{dish.min}
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={add ? dishQty[dish.id] || 0 : items.find(i => i.name === dish.name)?.qty || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleQtyChange(add ? dish.id : items.find(i => i.name === dish.name)?.id, 'dish', e)}
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
                                                                >{drink.name} - {drink.cost} € - min:{drink.min}
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={add ? drinkQty[drink.id] || 0 : items.find(i => i.name === drink.name)?.qty || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleQtyChange(add ? drink.id : items.find(i => i.name === drink.name)?.id, 'drink', e)}
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
                                                                >{drink.name} - {drink.cost} € - min:{drink.min}
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={add ? drinkQty[drink.id] || 0 : items.find(i => i.name === drink.name)?.qty || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleQtyChange(add ? drink.id : items.find(i => i.name === drink.name)?.id, 'drink', e)}
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
                        <div className={"w-full flex justify-center mt-3"}>
                            <button
                                type={"submit"}
                                className={"w-[10%] text-center text-base text-white bg-[#008080] hover:text-amber-50 hover:bg-[#013220] font-inter py-2 rounded-md"}
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
                <div className={"mb-2 pl-6"}>
                    <button
                        className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                        onClick={handleClose}
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPurchase;
