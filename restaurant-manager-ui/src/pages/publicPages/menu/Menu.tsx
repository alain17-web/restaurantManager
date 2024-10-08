import Navbar from "../../../components/generalComponents/navbar/Navbar.tsx";
import MenuSidebar from "../../../components/generalComponents/menuSidebar/MenuSidebar.tsx";
import {useState, useEffect, ChangeEvent} from "react";
import DishPopup from "../../../components/generalComponents/dishPopup/DishPopup.tsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Category, Dish, Drink} from '../../../types/types.ts'
import axios from "axios";
import useIsLargeScreen from "../../../hooks/screenWidth/largeScreen/useIsLargeScreen.tsx";
import useIsSmallScreen from "../../../hooks/screenWidth/mobileScreen/useIsSmallScreen.tsx";
import useIsMediumScreen from "../../../hooks/screenWidth/mediumScreen/useIsmediumScreen.tsx";

// TypeScript type guard to differentiate between Dish and Drink
const isDish = (item: Dish | Drink): item is Dish => {
    return (item as Dish).desc !== undefined;
};

// API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const Menu = () => {

    //defines a screen >= 1280px calling a hook
    const isLargeScreen = useIsLargeScreen()

    //defines a screen >= 768px & < 1280 calling a hook
    const isMediumScreen = useIsMediumScreen()

    //defines a screen < 768
    const isSmallScreen = useIsSmallScreen()

    const [selectedItem, setSelectedItem] = useState("Mezzes");
    const [dishes, setDishes] = useState<Dish[]>([])
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [catId, setCatId] = useState<number>(1)
    const [catType, setCatType] = useState<string>("")

    // Fetch dishes, drinks, and categories on component mount
    useEffect(() => {
        getDishes()
        getDrinks()
        getCategories()
    }, []);

    // Fetch all dishes from API
    const getDishes = async () => {
        const res = await axios.get(`${apiBaseUrl}/dishes`)
        setDishes(res.data)
    }

    // Fetch all drinks from API
    const getDrinks = async () => {
        const res = await axios.get(`${apiBaseUrl}/drinks`)
        setDrinks(res.data)
    }

    // Fetch all categories from API and set initial category ID and type
    const getCategories = async () => {
        const res = await axios.get(`${apiBaseUrl}/categories`)
        setCategories(res.data)
        // Find selected category
        const initialCat = res.data.find((cat: Category) => cat.cat_name === selectedItem);
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

    // Function to handle opening the popup with dish details
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

    // Pagination state variables
    const [page, setPage] = useState(1);// Current page number
    const itemsPerPage = isSmallScreen ? 3 : isMediumScreen ? 4 : 5;

    // Handle page change for pagination
    const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Update the category ID and type whenever the selected category changes
    useEffect(() => {
        if (categories.length > 0) {
            setPage(1);
            getCatId()
        }
    }, [selectedItem]);

    // Function to get category ID and type based on the selected item
    const getCatId = () => {
        const cat = categories.find(cat => cat.cat_name === selectedItem);
        if (cat) {
            setCatId(cat.id);
            setCatType(cat.type);
        }
    }

    // Filter items based on the selected category type (food or drink)
    const filteredItems = catType === "food"
        ? dishes.filter(dish => dish.cat_id === catId)
        : drinks.filter(drink => drink.cat_id === catId);


    // Paginate the filtered items
    const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);


    return (
        <div className={"w-full h-screen bg-no-repeat bg-center bg-cover overflow-hidden"}
             style={{backgroundImage: `url('./img/scenery.jpg')`}}>
            {!showPopup && <Navbar isOnAbout={false}/>}
            {!showPopup && <h1 className={"text-center text-xl md:text-2xl lg:text-4xl font-inter italic text-[#013220] mt-16"}>Bienvenue - مَرْحَبا</h1>}
            <div className={"w-full flex justify-center"}>
                <div className={isLargeScreen ? "w-[80%] mx-auto mt-10 flex flex-col items-center" : "w-full mt-0"}>
                    {/* Conditional rendering of DishPopup */}
                    {showPopup && isLargeScreen && <div
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
                    <ul className={"w-[60%] md:mx-auto"}>
                        <h3 className={"font-inter italic text-lg md:text-2xl text-[#013220] underline mb-3"}>Les {selectedItem}</h3>
                        {paginatedItems.map(item => (
                            // Render only items matching the category ID
                            item.cat_id === catId && (
                                <div key={item.id}>
                                    <li className={!isDish(item) ? "list-none" : "list-none bg-[#F5F5F5] rounded-md px-4 py-2"}>
                                        <h3 className={"font-inter italic text-sm md:text-xl text-[#013220] font-bold mb-[4px]"}>
                                            {item.name} - {item.price}€
                                        </h3>
                                        {isDish(item) && item.desc && (
                                            <div className={"flex flex-col items-start"}>
                                                {isLargeScreen &&
                                                    <p className={"mb-2 text-base md:text-lg text-[#013220] font-inter italic"}>
                                                        {item.desc}
                                                    </p>}
                                                <button
                                                    className={"cursor-pointer text-xs md:text-base text-white bg-[#6B8E23] hover:bg-[#008080] p-1 rounded-md"}
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
                    {/* mui-material Stack pagination component */}
                    <Stack spacing={2} className={"w-[80%] md:w-[40%] mx-auto mt-1 md:mt-2 lg:mt-4 bg-white rounded-md"}>
                        <Pagination
                            count={Math.ceil(filteredItems.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            shape="rounded"
                            showFirstButton
                            showLastButton
                            size={isLargeScreen ? "large" : "small"}
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