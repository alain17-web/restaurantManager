import {dishes,drinks} from "../../tempData.ts";
import {getRandomItems} from "../../utils/functions.ts";
import {useEffect, useState} from "react";

interface Props{
    numberOfPeople: number
}

interface Item {
    name: string
    price: number
    cat: string
}

const NewOrder = (props:Props) => {

    const [mainCourses, setMainCourses] = useState<Item[]>([])
    const [desserts, setDesserts] = useState<Item[]>([])
    const [coldDrinks, setColdDrinks] = useState<Item[]>([])
    const [warmDrinks, setWarmDrinks] = useState<Item[]>([])

    useEffect(() => {
        const mainCoursesArray:Item[] = []
        const dessertsArray:Item[] = []
        const coldDrinksArray:Item[] = []
        const warmDrinksArray:Item[] = []

        dishes.map((dish) => {
            if(dish.cat !=='Desserts'){
                mainCoursesArray.push(dish)
            } else {
                dessertsArray.push(dish)
            }
        })

        drinks.map((drink) => {
            if(drink.cat !== "Boissons chaudes"){
                coldDrinksArray.push(drink)
            } else {
                warmDrinksArray.push(drink)
            }
        })

        setMainCourses(getRandomItems(mainCoursesArray,props.numberOfPeople))
        setDesserts(getRandomItems(dessertsArray,props.numberOfPeople))
        setColdDrinks(getRandomItems(coldDrinksArray,props.numberOfPeople))
        setWarmDrinks(getRandomItems(warmDrinksArray,props.numberOfPeople))

    },[props.numberOfPeople])


    return (
        <section className={"w-full h-auto flex flex-col items-center justify-between pt-2"}>
            <h1 className={"text-center text-white text-2xl font-inter"}>Commande pour {props.numberOfPeople} personnes</h1>
            <div className={"w-full"}>
                <h2 className={"text-lg text-center font-inter underline"}>Plats</h2>
                <ul>
                    {mainCourses.map((course,index) => (
                        <li className={"text-base text-white text-center font-inter"} key={index}>{course.name} - {course.price} €</li>
                    ))}
                </ul>
            </div>
            <div className={"w-full"}>
                <h2 className={"text-lg text-center font-inter underline"}>Desserts</h2>
                <ul>
                    {desserts.map((course, index) => (
                        <li className={"text-base text-white text-center font-inter"}
                            key={index}>{course.name} - {course.price} €</li>
                    ))}
                </ul>
            </div>
            <div className={"w-full"}>
                <h2 className={"text-lg text-center font-inter underline"}>Boissons</h2>
                <ul>
                    {coldDrinks.map((course, index) => (
                        <li className={"text-base text-center text-white font-inter"}
                            key={index}>{course.name} - {course.price} €</li>
                    ))}
                </ul>
                <ul>
                    {warmDrinks.map((course, index) => (
                        <li className={"text-lg text-center text-white font-inter"}
                            key={index}>{course.name} - {course.price} €</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
export default NewOrder;