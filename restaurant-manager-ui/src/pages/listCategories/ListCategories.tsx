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
    const [refetchTrigger, setRefetchTrigger] = useState<number>(1);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axiosInstance.get('/categories/')
                const sortedCatsByType = res.data.sort((a:Category, b:Category) => a.type.localeCompare(b.type));
                setCategories(sortedCatsByType)
            } catch (error) {
                console.error('Error in getCategories', error);
            }
        }
        getCategories()
    }, [refetchTrigger]);

    const handleAddedOrEdited = () => {
        setRefetchTrigger(prev => prev + 1);
    };

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
                <h1 className={'text-center text-gray-600 text-2xl font-inter mt-5'}>Catégories</h1>
                {!open ? <DataTableCat categories={categories} getCategoryId={handleGetCatId} open={show}/> :
                    <NewCategory id={categoryId} setCategoryId={setCatId} categories={categories} onAddOrEdit={handleAddedOrEdited} close={close}/>}
            </div>
        </div>
    );
};
export default ListCategories;