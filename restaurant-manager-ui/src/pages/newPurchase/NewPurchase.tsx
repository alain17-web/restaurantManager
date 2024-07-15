import {Dish, Drink, Finance} from "../../types/types.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";
import Accordion from 'react-bootstrap/Accordion'
import {useNotifDispatch} from "../../hooks/notifications/useNotifDispatch.tsx";


const NewPurchase = () => {

    const dispatch = useNotifDispatch()

    const [max, setMax] = useState<number>(0);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [dishQty, setDishQty] = useState<{ [key: number]: number }>({});
    const [drinkQty, setDrinkQty] = useState<{ [key: number]: number }>({});


    const [purchase_date, setPurchase_date] = useState<string>("")
    const [total, setTotal] = useState<number>(0)
    const delivery_date = "en attente"
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [add, _setAdd] = useState<boolean>(true)

    const {formattedDate} = useCurrentDate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [financeRes, dishesRes, drinksRes] = await Promise.all([
                    axiosInstance.get('/finances/'),
                    axiosInstance.get('/dishes/'),
                    axiosInstance.get('/drinks/')
                ])
                const allMaxesAndIds: number[] = []
                financeRes.data.forEach((summary: Finance) => {
                    allMaxesAndIds.push(summary.id, summary.total_on_hand)
                })
                setMax(allMaxesAndIds[1])
                setDishes(dishesRes.data)
                setDrinks(drinksRes.data)


            } catch (error) {
                console.error("Error fetching data", error)
            }
        }
        fetchData()
    }, []);

    const handleDishQty = (id: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setDishQty((prevDishQty) => ({...prevDishQty, [id]: value}));
        }
    }


    const handleDrinkQty = (id: number, event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setDrinkQty((prevDrinkQty) => ({...prevDrinkQty, [id]: value}));
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

            const newTotal = dishTotal + drinkTotal
            setTotal(parseFloat(newTotal.toFixed(2)));
            setPurchase_date(formattedDate)
        };

        calculateTotal();
    }, [dishQty, drinkQty, dishes, drinks]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const purchase = {
            purchase_date,
            total,
            delivery_date,
        }
        try {
            const purchaseRes = await axiosInstance.post('/purchases/addPurchase', purchase)

            const purchaseId = purchaseRes.data.purchaseResult.id



            const purchaseItems = [
                ...dishes
                    .filter(item => dishQty[item.id] > 0)
                    .map(item => ({
                        purchase_id: purchaseId,
                        name: item.name,
                        type: item.cat_id !== 5 ? "plats" : "desserts",
                        cost: item.cost,
                        qty: dishQty[item.id],
                        delivery_date
                    })),
                ...drinks
                    .filter(item => drinkQty[item.id] > 0)
                    .map(item => ({
                        purchase_id: purchaseId,
                        name: item.name,
                        type: item.cat_id !== 9 ? "boissons froides" : "boissons chaudes",
                        cost: item.cost,
                        qty: drinkQty[item.id],
                        delivery_date
                    }))
            ]

            for (const purchaseItem of purchaseItems) {
                await axiosInstance.post('/purchaseItems/addPurchaseItem', purchaseItem)
            }
                setDishQty({});
                setDrinkQty({});
                setSuccess(true)
                setMessage("Le réappro a été envoyé")
                dispatch({type: 'ADD_PURCHASE_NOTIF'})

        } catch (error) {
            console.error("Error creating new purchase", error)
            setMessage("La création du réappro a échoué")
            setSuccess(false)
        }
    }


    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un réappro -" : "Modifier un réappro -"}<span
                        className={"font-bold"}> Montant maximum : {max.toFixed(2)}€</span></h1>
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
                <div className={"flex justify-content-end mr-20 text-2xl"}>
                    <p className={"pl-15 font-inter text-slate-600"}>TOTAL: {total.toFixed(2)}€</p>
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
                                                                        value={dishQty[dish.id] || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleDishQty(dish.id, e)}
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
                                                                        value={dishQty[dish.id] || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleDishQty(dish.id, e)}
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
                                                                        value={drinkQty[drink.id] || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleDrinkQty(drink.id, e)}
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
                                                                        value={drinkQty[drink.id] || 0}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={(e) => handleDrinkQty(drink.id, e)}
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
            </div>
        </div>
    );
};
export default NewPurchase;
