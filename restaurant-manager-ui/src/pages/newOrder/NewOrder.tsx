import {dishes, drinks} from "../../tempData.ts";
import {getRandomItems} from "../../utils/functions.ts";
import {FormEvent, useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion'
import {Item} from "../../types/types.ts";

interface Props {
    numberOfPeople: number
    username: string
    closeNewOrder: () => void;
}

const NewOrder = (props: Props) => {

    const [mainCourses, setMainCourses] = useState<Item[]>([])
    const [desserts, setDesserts] = useState<Item[]>([])
    const [coldDrinks, setColdDrinks] = useState<Item[]>([])
    const [warmDrinks, setWarmDrinks] = useState<Item[]>([])

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const mainCoursesArray: Item[] = []
        const dessertsArray: Item[] = []
        const coldDrinksArray: Item[] = []
        const warmDrinksArray: Item[] = []

        dishes.map((dish) => {
            if (dish.cat !== 'Desserts') {
                mainCoursesArray.push(dish)
            } else {
                dessertsArray.push(dish)
            }
        })

        drinks.map((drink) => {
            if (drink.cat !== "Boissons chaudes") {
                coldDrinksArray.push(drink)
            } else {
                warmDrinksArray.push(drink)
            }
        })

        const selectedMainCourses = getRandomItems(mainCoursesArray, props.numberOfPeople)
        const selectedDesserts = getRandomItems(dessertsArray, props.numberOfPeople)
        const selectedColdDrinks = getRandomItems(coldDrinksArray, props.numberOfPeople)
        const selectedWarmDrinks = getRandomItems(warmDrinksArray, props.numberOfPeople)

        setMainCourses(selectedMainCourses)
        setDesserts(selectedDesserts)
        setColdDrinks(selectedColdDrinks)
        setWarmDrinks(selectedWarmDrinks)

        const totalCourses = selectedMainCourses.reduce((acc, item) => acc + item.price, 0)
        const totalDesserts = selectedDesserts.reduce((acc, item) => acc + item.price, 0)
        const totalColds = selectedColdDrinks.reduce((acc, item) => acc + item.price, 0)
        const totalWarms = selectedWarmDrinks.reduce((acc, item) => acc + item.price, 0)

        const totalAmount = totalCourses + totalDesserts + totalColds + totalWarms
        setTotal(parseFloat(totalAmount.toFixed(2)))

    }, [props.numberOfPeople])

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
                pour {props.numberOfPeople} - <span
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