import {Dish, Drink, Finance, NewPurchaseData} from "../../types/types.ts";
import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance.tsx";
import useCurrentDate from "../../hooks/date/useCurrentDate.tsx";
import Accordion from 'react-bootstrap/Accordion'
//import QtyOption from "../../components/qtyOption/QtyOption.tsx";

const NewPurchase = (props: NewPurchaseData) => {

    const [max, setMax] = useState<number>(0);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [dishQty, setDishQty] = useState<number>(0);
    const [drinkQty, setDrinkQty] = useState<number>(0);

    /*const [mainCourses, setMainCourses] = useState<Dish[]>([])
    const [desserts, setDesserts] = useState<Dish[]>([])
    const [coldDrinks, setColdDrinks] = useState<Drink[]>([])
    const [warmDrinks, setWarmDrinks] = useState<Drink[]>*/
    ([])
    const [purchase_date, setPurchase_date] = useState<string>("")
    const [total, setTotal] = useState<number>(0)
    const delivery_date = "en attente"
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [add, setAdd] = useState<boolean>(true)

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

    const handleDishQty = () => {

    }

    const handleDrinkQty = () => {

    }
    return (
        <div className={"w-full flex"}>
            <div className={"flex-[6]"}>
                <div className={"custom-shadow p-[10px] m-5"}>
                    <h1 className={"text-[#808080B2] text-2xl text-center"}>{add ? "Ajouter un réappro -" : "Modifier un réappro -"}<span
                        className={"font-bold"}> Montant maximum : {max}€</span></h1>
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
                    <p className={"pl-15 font-inter text-slate-600"}>TOTAL: {total}€</p>
                </div>
                <div className={"custom-shadow p-[10px] m-5 mt-0"}>
                    <form className={"w-full"}>
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
                                                                >{dish.name} - {dish.cost} €
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={drinkQty}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={handleDishQty}
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
                                                                >{dish.name} - {dish.cost} €
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={drinkQty}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={handleDishQty}
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
                                                                >{drink.name} - {drink.cost} €
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={drinkQty}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={handleDrinkQty}
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
                                                                >{drink.name} - {drink.cost} €
                                                                    <input
                                                                        type={"number"}
                                                                        min={"0"}
                                                                        value={drinkQty}
                                                                        className={"w-16 h-6 pl-6 border-1 border-slate-400"}
                                                                        onChange={handleDrinkQty}
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
