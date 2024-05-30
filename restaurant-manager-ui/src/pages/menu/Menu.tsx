import Navbar from "../../components/navbar/Navbar.tsx";
import {dishes} from '../../tempData.ts';
import {drinks} from "../../tempData.ts";
import MenuSidebar from "../../components/menuSidebar/MenuSidebar.tsx";
import {useState} from "react";
import DishPopup from "../../components/dishPopup/DishPopup.tsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Dish,Drink } from '../../types/types.ts'

//TS guard
const isDish = (item: Dish | Drink): item is Dish => {
    return (item as Dish).desc !== undefined;
};


export const Menu = () => {
    const [selectedItem, setSelectedItem] = useState("Mezzes");

    // Handle Popup Single Product
    const [dishName, setDishName] = useState<string>("");
    const [dishImg, setDishImg] = useState<string>("");
    const [dishDesc, setDishDesc] = useState<string>("");
    const [dishPrice, setDishPrice] = useState<number>(0);
    const [dishAllerg, setDishAllerg] = useState<string>("");

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handlePopup = (dishName: string, dishImg: string, dishDesc: string, dishPrice: number, dishAllerg: string) => {
        setShowPopup(true);
        setDishName(dishName);
        setDishImg(dishImg);
        setDishDesc(dishDesc);
        setDishPrice(dishPrice);
        setDishAllerg(dishAllerg);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const filteredItems = selectedItem !== "Softs" && selectedItem !== "Boissons chaudes" && selectedItem !== "Vins" && selectedItem !== "Bières"
        ? dishes.filter(dish => dish.cat === selectedItem)
        : drinks.filter(drink => drink.cat === selectedItem);

    const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className={"w-full h-screen bg-no-repeat bg-center bg-cover overflow-hidden"}
             style={{backgroundImage: `url('./img/scenery.jpg')`}}>
            <Navbar isOnAbout={false}/>
            <h1 className={"text-center text-4xl font-inter italic text-[#013220] mt-16"}>Bienvenue - مَرْحَباً - ברוך
                הבא</h1>
            <div className={"w-full flex"}>
                <MenuSidebar onItemSelect={setSelectedItem} selectedItem={selectedItem}/>
                <div className={"w-[80%] mx-auto mt-10 flex flex-col items-center"}>
                    {showPopup && <div
                        className="absolute inset-0 bg-[#000000d3] opacity-50 backdrop-filter backdrop-blur-md"></div>}
                    {showPopup &&
                        <DishPopup
                            dishName={dishName}
                            dishImg={dishImg}
                            dishDesc={dishDesc}
                            dishPrice={dishPrice}
                            dishAllerg={dishAllerg}
                            closePopup={closePopup}
                        />
                    }
                    <ul className={"w-[60%] mx-auto"}>
                        <h3 className={"font-inter italic text-2xl text-amber-50 underline mb-3"}>Les {selectedItem}</h3>
                        {paginatedItems.map((item) => (
                                item.cat === `${selectedItem}` && (
                                    <div key={item.id}>
                                        <li className={"list-none"}>
                                            <h3 className={"font-inter italic text-xl text-[#013220] font-bold mb-[-4px]"}>
                                                {item.name} - {item.price}€
                                            </h3>
                                            {isDish(item) && item.desc && ( <p className={"mb-4 text-lg text-[#013220] font-inter italic semibold"}>
                                                {item.desc}
                                                <span
                                                    className={"cursor-pointer text-2xl text-amber-100 hover:text-amber-950"}
                                                    onClick={() => handlePopup(item.name, item.img, item.desc, item.price, item.allerg ?? "")}
                                                >
                                                    ...+
                                                </span>
                                            </p>
                                            )}
                                        </li>
                                    </div>
                                )
                            ))}
                    </ul>
                    <Stack spacing={2} className={"mt-4"}>
                        <Pagination
                            count={Math.ceil(filteredItems.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            shape="rounded"
                            variant="outlined"
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};


export default Menu