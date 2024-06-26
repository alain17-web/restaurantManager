import Navbar from "../../components/navbar/Navbar.tsx";
import MenuSidebar from "../../components/menuSidebar/MenuSidebar.tsx";
import {useState, useEffect, ChangeEvent} from "react";
import DishPopup from "../../components/dishPopup/DishPopup.tsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Category, Dish, Drink} from '../../types/types.ts'
import axios from "axios";

//TS guard
const isDish = (item: Dish | Drink): item is Dish => {
    return (item as Dish).desc !== undefined;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const Menu = () => {
    const [selectedItem, setSelectedItem] = useState("Mezzes");
    const [dishes, setDishes] = useState<Dish[]>([])
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [catId, setCatId] = useState<number>(1)
    const [catType, setCatType] = useState<string>("")

    useEffect(() => {
        getDishes()
        getDrinks()
        getCategories()
    }, []);

    const getDishes = async () => {
        const res = await axios.get(`${apiBaseUrl}/dishes`)
        setDishes(res.data)
    }

    const getDrinks = async () => {
        const res = await axios.get(`${apiBaseUrl}/drinks`)
        setDrinks(res.data)
    }

    const getCategories = async () => {
        const res = await axios.get(`${apiBaseUrl}/categories`)
        setCategories(res.data)
        const initialCat = res.data.find((cat:Category) => cat.cat_name === selectedItem);
        if (initialCat) {
            setCatId(initialCat.id);
            setCatType(initialCat.type);
        }
    }

    // Handle Popup Single Product
    const [dishName, setDishName] = useState<string>("");
    const [dishImg, setDishImg] = useState<string>("");
    const [dishDesc, setDishDesc] = useState<string>("");
    const [dishPrice, setDishPrice] = useState<number | string>(0);
    const [dishAllerg, setDishAllerg] = useState<string>("");

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handlePopup = (dishName: string, dishImg: string, dishDesc: string, dishPrice: number | string, dishAllerg: string) => {
        setShowPopup(true);
        setDishName(dishName);
        setDishImg(dishImg)
        setDishDesc(dishDesc);
        setDishPrice(dishPrice);
        setDishAllerg(dishAllerg);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (categories.length > 0) {
            setPage(1);
            getCatId()
        }
    }, [selectedItem]);

    const getCatId = () => {
        const cat = categories.find(cat => cat.cat_name === selectedItem);
        if (cat) {
            setCatId(cat.id);
            setCatType(cat.type);
        }
    }

    const filteredItems = catType === "food"
        ? dishes.filter(dish => dish.cat_id === catId)
        : drinks.filter(drink => drink.cat_id === catId);


    const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    console.log(dishImg)

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
                        {paginatedItems.map(item => (
                            item.cat_id === catId && (
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
                <MenuSidebar
                    onItemSelect={setSelectedItem}
                    selectedItem={selectedItem}
                    categories={categories}
                />
            </div>
        </div>
    );
};


export default Menu