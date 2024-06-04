import DashboardSidebar from "../../components/dashboardSidebar/DashboardSidebar.tsx";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar.tsx";
import {useState,useEffect} from "react";
import { categories as catData} from "../../tempData.ts";
import {Category} from "../../types/types.ts";
import DataTableCat from "../../components/dataTableCat/DataTableCat.tsx";
import NewCategory from "../newCategory/NewCategory.tsx";

const ListCategories = () => {

    const [_categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCatId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = () => {
        setCategories(catData)
    }

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
    {!open ? <DataTableCat getCatId={handleGetCatId} open={show}/> : <NewCategory id={categoryId} setCatId={setCatId}/>}
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