import Navbar from "../../components/navbar/Navbar.tsx";
import {dishes} from '../../tempData.ts';
import {drinks} from "../../tempData.ts";
import MenuSidebar from "../../components/menuSidebar/MenuSidebar.tsx";
import {useState, useEffect} from "react";
import DishPopup from "../../components/dishPopup/DishPopup.tsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Dish, Drink} from '../../types/types.ts'

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

    const handleChangePage = (_event:React.ChangeEvent<unknown>,value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(1);
    }, [selectedItem]);

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
            <div className={"w-full flex justify-center"}>
                <div className={"w-[80%] mx-auto mt-10 flex flex-col items-center"}>
                    {showPopup && <div
                        className={"absolute inset-0 bg-[#000000d3] opacity-50 backdrop-filter backdrop-blur-md"}></div>}
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
                        <h3 className={"font-inter italic text-2xl text-[#013220] underline mb-3"}>Les {selectedItem}</h3>
                        {paginatedItems.map((item) => (
                            item.cat === `${selectedItem}` && (
                                <div key={item.id}>
                                    <li className={!isDish(item) ? "list-none" : "list-none bg-[#F5F5F5] rounded-md px-4 py-2"}>
                                        <h3 className={"font-inter italic text-xl text-[#013220] font-bold mb-[4px]"}>
                                            {item.name} - {item.price}€
                                        </h3>
                                        {isDish(item) && item.desc && (
                                            <div className={"flex flex-col items-start"}>
                                                <p className={"mb-2 text-lg text-[#013220] font-inter italic"}>
                                                    {item.desc}
                                                </p>
                                                <button
                                                    className={"cursor-pointer text-base text-white bg-[#6B8E23] hover:bg-[#008080] p-1 rounded-md"}
                                                    onClick={() => handlePopup(item.name, item.img, item.desc, item.price, item.allerg ?? "")}
                                                >
                                                    Voir Plus
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                </div>
                            )
                        ))}
                    </ul>
                    <Stack spacing={2} className={"mt-4 bg-white rounded-md"}>
                        <Pagination
                            count={Math.ceil(filteredItems.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            shape="rounded"
                            showFirstButton
                            showLastButton
                            size="large"
                        />
                    </Stack>
                </div>
                <MenuSidebar onItemSelect={setSelectedItem} selectedItem={selectedItem}/>
            </div>
        </div>
    );
};


export default Menu