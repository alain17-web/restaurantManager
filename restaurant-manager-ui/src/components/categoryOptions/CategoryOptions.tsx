import {useEffect, useState} from "react";
import {Category} from "../../types/types.ts";
import axiosInstance from "../../axios/axiosInstance.tsx";

interface Props {
    isDish:boolean
}

 const CategoryOptions = ({isDish}:Props) => {

    const [categories, setCategories] = useState<Category[]>([]);

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

    return (
        <>
            <option>Choisir une catégorie</option>
            {categories.map((category) =>
                category.type === (isDish ? "food" : "beverage") ? (
                    <option key={category.id} value={category.id}>{category.cat_name}</option>) : null
            )}
        </>
    );
};
export default CategoryOptions;