import Navbar from "../../components/navbar/Navbar.tsx";
import {dishes} from '../../tempData.ts'
import MenuSidebar from "../../components/menuSidebar/MenuSidebar.tsx";
import {useState} from "react";
import DishPopup from "../../components/dishPopup/DishPopup.tsx";


export const Menu = () => {

    const [selectedItem, setSelectedItem] = useState("Mezzes")

    //handle Popup Single Product

    const [dishName, setDishName] = useState<string>("")
    const [dishImg, setDishImg] = useState<string>("")
    const [dishDesc, setDishDesc] = useState<string>("")
    const [dishPrice, setDishPrice] = useState<number>(0)

    const [showPopup, setShowPopup] = useState<boolean>(false)

    const handlePopup = (dishName: string, dishImg: string, dishDesc: string, dishPrice: number) =>{
        setShowPopup(true)
        setDishName(dishName)
        setDishImg(dishImg)
        setDishDesc(dishDesc)
        setDishPrice(dishPrice)
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    return (
        <section className={"w-full h-screen bg-no-repeat bg-center bg-cover overflow-hidden"}
                 style={{backgroundImage: `url('./img/scenery.jpg')`}}>
            <Navbar/>
            <h1 className={"text-center text-5xl font-inter italic text-[#013220] mt-16"}>Bienvenue - مَرْحَباً - ברוך
                הבא</h1>
           <section className={"w-full flex"}>
               <MenuSidebar onItemSelect={setSelectedItem} selectedItem={selectedItem}/>
            <main className={"w-[80%] mx-auto mt-12"}>
                {showPopup && <div className="absolute inset-0 bg-[#000000d3] opacity-50 backdrop-filter backdrop-blur-md"></div>}
                { showPopup && <DishPopup dishName={dishName} dishImg={dishImg} dishDesc={dishDesc} dishPrice={dishPrice} closePopup={closePopup}/>}
                <ul className={"w-[60%] mx-auto"}>
                    <h3 className={"font-inter italic text-2xl text-amber-50 underline mb-5"}>Les {selectedItem}</h3>
                    {dishes.map((dish) => (
                        <div key={dish.id}>
                            {dish.cat === `${selectedItem}` ? (
                                <li className={"list-none"}>
                                    <h3 className={"font-inter italic text-xl text-[#013220] font-bold"}>{dish.name} - {dish.price + "€"} </h3>
                                    <p className={"mb-4 text-lg text-[#013220] font-inter italic semibold"}>{dish.desc}
                                        <span
                                            className={"cursor-pointer text-2xl text-amber-100 hover:text-amber-950"}
                                            onClick={() => handlePopup(dish.name,dish.img,dish.desc,dish.price,)}
                                        >
                                            ...+
                                        </span>
                                    </p>
                                </li>
                            ) : ""}
                        </div>
                    ))}

                </ul>
            </main>
           </section>
        </section>
    );
};