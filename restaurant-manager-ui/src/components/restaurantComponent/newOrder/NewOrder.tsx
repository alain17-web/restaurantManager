import { getRandomItems } from "../../../utils/functions.ts";
import { FormEvent, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Dish, Drink, NewOrderData } from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";
import useCurrentDate from "../../../hooks/date/useCurrentDate.tsx";
import { useNotifDispatch } from "../../../hooks/notifications/useNotifDispatch.tsx";


const NewOrder = (props: NewOrderData) => {

    // use of a hook that adds a notification when a new order is created
    const dispatch = useNotifDispatch();


    const [dishes, setDishes] = useState<Dish[]>([]);
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [mainCourses, setMainCourses] = useState<Dish[]>([]);
    const [desserts, setDesserts] = useState<Dish[]>([]);
    const [coldDrinks, setColdDrinks] = useState<Drink[]>([]);
    const [warmDrinks, setWarmDrinks] = useState<Drink[]>([]);
    const [order_date, setOrder_date] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [people, setPeople] = useState<number>(0);
    const validated = "en attente";
    const validatedBy = "";
    const [total, setTotal] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    // Custom hook to get the formatted current date
    const { formattedDate } = useCurrentDate();

    // Fetches data for dishes and drinks on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dishes and drinks data simultaneously
                const [dishesRes, drinksRes] = await Promise.all([
                    axiosInstance.get('/dishes/'),
                    axiosInstance.get('/drinks/')
                ]);

                // Convert prices from string to number format
                const dishesWithNumPrices = dishesRes.data.map((dish: Dish) => ({
                    ...dish,
                    price: parseFloat(dish.price as string)
                }));

                const drinksWithNumPrices = drinksRes.data.map((drink: Drink) => ({
                    ...drink,
                    price: parseFloat(drink.price as string)
                }));

                // Set dishes and drinks state
                setDishes(dishesWithNumPrices);
                setDrinks(drinksWithNumPrices);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    // Categorizes dishes and drinks based on their category ID and calculates the total cost
    useEffect(() => {
        if (dishes.length > 0 && drinks.length > 0) {
            // Arrays to store categorized dishes and drinks
            const mainCoursesArray: Dish[] = [];
            const dessertsArray: Dish[] = [];
            const coldDrinksArray: Drink[] = [];
            const warmDrinksArray: Drink[] = [];

            // Categorize dishes based on their category ID
            dishes.forEach((dish: Dish) => {
                if (dish.cat_id !== 5) {
                    mainCoursesArray.push(dish);
                } else {
                    dessertsArray.push(dish);
                }
            });

            // Categorize drinks based on their category ID
            drinks.forEach((drink: Drink) => {
                if (drink.cat_id !== 9) {
                    coldDrinksArray.push(drink);
                } else {
                    warmDrinksArray.push(drink);
                }
            });

            // Select random items based on the number of people in the props
            const selectedMainCourses: Dish[] = getRandomItems(mainCoursesArray, props.people);
            const selectedDesserts: Dish[] = getRandomItems(dessertsArray, props.people);
            const selectedColdDrinks: Drink[] = getRandomItems(coldDrinksArray, props.people);
            const selectedWarmDrinks: Drink[] = getRandomItems(warmDrinksArray, props.people);

            // Set state with selected items
            setMainCourses(selectedMainCourses);
            setDesserts(selectedDesserts);
            setColdDrinks(selectedColdDrinks);
            setWarmDrinks(selectedWarmDrinks);

            // Calculate the total cost
            const totalCourses = selectedMainCourses.reduce((acc, dish) => acc + (parseFloat(dish.price as string)), 0);
            const totalDesserts = selectedDesserts.reduce((acc, dish) => acc + (parseFloat(dish.price as string)), 0);
            const totalColds = selectedColdDrinks.reduce((acc, drink) => acc + (parseFloat(drink.price as string)), 0);
            const totalWarms = selectedWarmDrinks.reduce((acc, drink) => acc + (parseFloat(drink.price as string)), 0);

            // Total amount
            const totalAmount = totalCourses + totalDesserts + totalColds + totalWarms;

            // Set total amount and other order details
            setTotal(parseFloat(totalAmount.toFixed(2)));
            setPeople(props.people);
            setUsername(props.username as string);
            setOrder_date(formattedDate);
        }
    }, [dishes, drinks, props.people]);

    // Helper function to extract names and prices from items
    const extractNameAndPrice = (items: { name: string; price: string | number }[]) => {
        return items.map(item => ({
            name: item.name,
            price: item.price
        }));
    };

    // Handles form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Transform items to have only necessary fields
        const transformedMainCourses = extractNameAndPrice(mainCourses);
        const transformedDesserts = extractNameAndPrice(desserts);
        const transformedColdDrinks = extractNameAndPrice(coldDrinks);
        const transformedWarmDrinks = extractNameAndPrice(warmDrinks);

        // Order object to be submitted
        const order = {
            people,
            username,
            order_date,
            total,
            validated,
            validatedBy
        };

        try {
            // Submit the order and get the order ID
            const orderRes = await axiosInstance.post('/orders/addOrder', order);
            const orderId = orderRes.data.orderResult.order_id;

            // Create order items array
            const orderItems = [
                ...transformedMainCourses.map(item => ({
                    ...item,
                    order_id: orderId,
                    type: 'maineCourse',
                    validated,
                    validatedBy
                })),
                ...transformedDesserts.map(item => ({
                    ...item,
                    order_id: orderId,
                    type: 'desserts',
                    validated,
                    validatedBy
                })),
                ...transformedColdDrinks.map(item => ({
                    ...item,
                    order_id: orderId,
                    type: 'coldDrinks',
                    validated,
                    validatedBy
                })),
                ...transformedWarmDrinks.map(item => ({
                    ...item,
                    order_id: orderId,
                    type: 'warmDrinks',
                    validated,
                    validatedBy
                })),
            ];

            // Submit each order item
            for (const orderItem of orderItems) {
                await axiosInstance.post('/orderItems/addOrderItem', orderItem);
            }
            setSuccess(true); // Set success state
            setMessage('La commande a été envoyée'); // Set success message
            dispatch({ type: 'ADD_ORDER_NOTIF' }); // Dispatch notification

        } catch (error) {
            console.error('Error in posting order', error);
            setMessage("L'envoi de la commande a échoué"); // Set error message
        }
    };

    return (
        <>
            {success ? (
                <div className={"p-2 h-4 m-4 text-center text-green-600"}>
                    <p className={"text-green-800 text-lg font-bold"}>{message} <span
                        className={"ml-3 text-2xl cursor-pointer px-1 border-1 border-green-600"}
                        onClick={props.closeNewOrder}>X</span></p>
                </div>
            ) : (
                <div className={"px-2 h-9 m-3 mb-3 text-center text-green-600 flex items center justify-center gap-3 "}>
                    {message !== "" && (<p className={"text-red-600 text-lg"}>{message} <span
                        className={"ml-3 text-2xl cursor-pointer px-1 border-1 border-red-600"}
                        onClick={props.closeNewOrder}>X</span></p>)}
                </div>
            )}
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
                {!success && <button
                    disabled={username === "guest"}
                    className={username !== "guest" ? "w-[50%] mx-auto h-8 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-pointer" : "w-[50%] mx-auto h-8 px-6 py-auto bg-[#013220] hover:bg-[#6B8E23] text-white text-base font-inter rounded-md cursor-not-allowed"}
                    type={"submit"}
                >
                    Valider
                </button>}
            </form>
        </>
    );
};
export default NewOrder;
