import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useState, useEffect} from "react";
import {Category} from "../../types/types.ts";
import DataTableCat from "../../components/dataTableCat/DataTableCat.tsx";
import NewCategory from "../newCategory/NewCategory.tsx";
import axiosInstance from "../../axios/axiosInstance.tsx";

const ListCategories = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCatId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axiosInstance.get('/categories/')
                setCategories(res.data)
            } catch (error) {
                console.error('Error in getCategories', error);
            }
        }
        getCategories()
    }, []);

    const handleGetCatId = (id: number) => {
        setCatId(id)
        setOpen(true);
    }

    const show = () => {
        setCatId(null)
        setOpen(true)
    }

    const close = () => {
        setOpen(false);
    }
    return (
        <div className={"w-full flex"}>
            <DashboardSidebar/>
            <div className={"flex-[6]"}>
                <DashboardNavbar/>
                <h1 className={'text-center text-gray-300 text-2xl font-inter mt-5'}>Catégories</h1>
                {!open ? <DataTableCat categories={categories} getCategoryId={handleGetCatId} open={show}/> :
                    <NewCategory id={categoryId} setCategoryId={setCatId} categories={categories}/>}
                {open ?
                    <div className={"mb-2 pl-6"}>
                        <button
                            className={"m-3 p-3 text-white bg-[#6B8E23] cursor-pointer"}
                            onClick={close}
                        >
                            Retour à la liste
                        </button>
                    </div> : ""
                }
            </div>
        </div>
    );
};
export default ListCategories;