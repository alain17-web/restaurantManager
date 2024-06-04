import {categories as catData} from "../../tempData.ts";
import {useEffect, useState} from "react";
import {Category} from "../../types/types.ts";

interface Props {
    isDish:boolean
}

 const CategorOptions = ({isDish}:Props) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = () => {
        setCategories(catData);
    }

    return (
        <>
            <option>Choisir une catégorie</option>
            {categories.map((category) =>
                category.type === (isDish ? "food" : "beverage") ? (
                    <option key={category.id}>{category.cat_name}</option>) : null
            )}
        </>
    );
};
export default CategorOptions;