import {dishes, drinks} from "../../tempData.ts";
import {getRandomItems} from "../../utils/functions.ts";
import {FormEvent, useEffect, useState} from "react";
import Accordion from 'react-bootstrap/Accordion'

interface Props {
    numberOfPeople: number
    username: string
    closeNewOrder: () => void;
}

interface Item {
    name: string
    price: number
    cat: string
}

const NewOrder = (props: Props) => {

    const [mainCourses, setMainCourses] = useState<Item[]>([])
    const [desserts, setDesserts] = useState<Item[]>([])
    const [coldDrinks, setColdDrinks] = useState<Item[]>([])
    const [warmDrinks, setWarmDrinks] = useState<Item[]>([])

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

        setMainCourses(getRandomItems(mainCoursesArray, props.numberOfPeople))
        setDesserts(getRandomItems(dessertsArray, props.numberOfPeople))
        setColdDrinks(getRandomItems(coldDrinksArray, props.numberOfPeople))
        setWarmDrinks(getRandomItems(warmDrinksArray, props.numberOfPeople))

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
                    className={"text-[#013220] text-xl font-inter italic"}>{props.username}</span></h1>
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
                                {desserts.map((course, index) => (
                                    <li className={"text-base text-center font-inter"}
                                        key={index}>{course.name} - {course.price} €</li>
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
                                {coldDrinks.map((course, index) => (
                                    <li className={"text-base text-center font-inter"}
                                        key={index}>{course.name} - {course.price} €</li>
                                ))}
                            </ul>
                            <h2 className={"text-lg text-center font-inter underline"}>Boissons chaudes</h2>
                            <ul>
                                {warmDrinks.map((course, index) => (
                                    <li className={"text-lg text-center font-inter"}
                                        key={index}>{course.name} - {course.price} €</li>
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