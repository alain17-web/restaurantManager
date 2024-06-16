
import {getRandomItems} from "../../utils/functions.ts";
import {FormEvent, useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion'
import {Dish, Drink, NewOrderData} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";


const NewOrder = (props: NewOrderData) => {

    const [dishes,setDishes]= useState<Dish[]>([])
    const [drinks,setDrinks]= useState<Drink[]>([])
    const [mainCourses, setMainCourses] = useState<Dish[]>([])
    const [desserts, setDesserts] = useState<Dish[]>([])
    const [coldDrinks, setColdDrinks] = useState<Drink[]>([])
    const [warmDrinks, setWarmDrinks] = useState<Drink[]>([])

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dishesRes, drinksRes] = await Promise.all([
                    axiosInstance.get('/dishes/'),
                    axiosInstance.get('/drinks/')
                ]);

                const dishesWithNumPrices = dishesRes.data.map((dish:Dish) => ({
                    ...dish,
                    price: parseFloat(dish.price as string)
                }))

                const drinksWithNumPrices = drinksRes.data.map((drink:Drink) => ({
                    ...drink,
                    price: parseFloat(drink.price as string)
                }))
                setDishes(dishesWithNumPrices);
                setDrinks(drinksWithNumPrices);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {

        if (dishes.length > 0 && drinks.length > 0) {

            const mainCoursesArray: Dish[] = []
            const dessertsArray: Dish[] = []
            const coldDrinksArray: Drink[] = []
            const warmDrinksArray: Drink[] = []


            dishes.forEach((dish:Dish) => {
                if (dish.cat_id !== 5) {
                    mainCoursesArray.push(dish)
                } else {
                    dessertsArray.push(dish)
                }
            })

            drinks.forEach((drink:Drink) => {
                if (drink.cat_id !== 9) {
                    coldDrinksArray.push(drink)
                } else {
                    warmDrinksArray.push(drink)
                }
            })



            const selectedMainCourses:Dish[] = getRandomItems(mainCoursesArray, props.people)
            const selectedDesserts:Dish[] = getRandomItems(dessertsArray, props.people)
            const selectedColdDrinks:Drink[] = getRandomItems(coldDrinksArray, props.people)
            const selectedWarmDrinks:Drink[] = getRandomItems(warmDrinksArray, props.people)

            setMainCourses(selectedMainCourses)
            setDesserts(selectedDesserts)
            setColdDrinks(selectedColdDrinks)
            setWarmDrinks(selectedWarmDrinks)



            const totalCourses = selectedMainCourses.reduce((acc, dish) => acc + (parseFloat(dish.price as string)), 0)
            const totalDesserts = selectedDesserts.reduce((acc, dish) => acc + (parseFloat(dish.price as string)), 0)
            const totalColds = selectedColdDrinks.reduce((acc, drink) => acc + (parseFloat(drink.price as string)), 0)
            const totalWarms = selectedWarmDrinks.reduce((acc, drink) => acc + (parseFloat(drink.price as string)), 0)


            const totalAmount = totalCourses + totalDesserts + totalColds + totalWarms

            setTotal(parseFloat(totalAmount.toFixed(2)))
        }
    }, [dishes,drinks,props.people])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        props.closeNewOrder()
    }

    return (
        <form
            className={"w-full h-auto flex flex-col items-center justify-around gap-3"}
            onSubmit={handleSubmit}
        >
            <h1 className={"text-center text-[#013220] text-xl font-inter"}>Commande
                pour {props.people} - <span
                    className={"text-[#013220] text-xl font-inter italic"}>{props.username} </span> - {total}€</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Plats - Desserts</Accordion.Header>
                    <Accordion.Body>
                        <div className={"w-full"}>
                            <h2 className={"text-lg text-center font-inter underline"}>Plats</h2>
                            <ul>
                                {mainCourses.map((course, index) => (
                                    <li className={"text-base text-center font-inter"}
                                        key={index}>{course.name} - {course.price} €</li>
                                ))}
                            </ul>
                        </div>
                        <div className={"w-full"}>
                            <h2 className={"text-lg text-center font-inter underline"}>Desserts</h2>
                            <ul>
                                {desserts.map((dessert, index) => (
                                    <li className={"text-base text-center font-inter"}
                                        key={index}>{dessert.name} - {dessert.price} €</li>
                                ))}
                            </ul>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Boissons</Accordion.Header>
                    <Accordion.Body>
                        <div className={"w-full"}>
                            <h2 className={"text-lg text-center font-inter underline"}>Boissons froides</h2>
                            <ul>
                                {coldDrinks.map((cold, index) => (
                                    <li className={"text-base text-center font-inter"}
                                        key={index}>{cold.name} - {cold.price} €</li>
                                ))}
                            </ul>
                            <h2 className={"text-lg text-center font-inter underline"}>Boissons chaudes</h2>
                            <ul>
                                {warmDrinks.map((warm, index) => (
                                    <li className={"text-lg text-center font-inter"}
                                        key={index}>{warm.name} - {warm.price} €</li>
                                ))}
                            </ul>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button
                className={"w-[50%] mx-auto h-12 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer"}
                type={"submit"}
            >
                Valider
            </button>
        </form>
    );
};
export default NewOrder;

