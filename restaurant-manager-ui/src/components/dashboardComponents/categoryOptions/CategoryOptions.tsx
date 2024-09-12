import {useEffect, useState} from "react";
import {Category} from "../../../types/types.ts";
import axiosInstance from "../../../axios/axiosInstance.tsx";

interface Props {
    isDish:boolean
}

 const CategoryOptions = ({isDish}:Props) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Function to fetch categories from the API
         const getCategories = async () => {
             try {
                 const res = await axiosInstance.get('/categories/')
                 setCategories(res.data)
             } catch (error) {
                 console.error('Error in getCategories', error);
             }
         }
         getCategories()
     }, []);// Empty dependency array ensures this effect runs only once, when the component mounts

    return (
        <>
            <option>Choisir une catégorie</option>
            {categories.map((category) =>
                // Check if the category type matches the isDish flag (food or beverage)
                category.type === (isDish ? "food" : "beverage") ? (
                    <option key={category.id} value={category.id}>{category.cat_name}</option>) : null
            )}
        </>
    );
};
export default CategoryOptions;