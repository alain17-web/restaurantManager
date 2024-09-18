const categoryService = require("../services/category.service");
const categoryValidator = require("../validators/categoryValidator");

//See comments in booking.controller to understand the logic on this controller called in the router
const categoryController = {
    //CREATE
    addCategory: async (req, res) => {
        try{
            const validateCat = await categoryValidator.validate(req.body);

            const {cat_name,type} = validateCat;

            const catResult = await categoryService.addCategory({cat_name,type})

            res.status(200).json({message: "Category created successfully.", catResult});

        } catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: 'Error controller creating the category'});
        }
    },

    //READ
    getAllCategories: async(req,res)=>{
        try{
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        }catch(error){
            console.error('Error getAllCategories controller',error)
            res.status(500).json({message: 'Error getAllCategories controller'});
        }
    },

    //UPDATE
    updateCategory: async (req, res) => {
        try{
            const validateCat = await categoryValidator.validate(req.body);

            const {cat_name,type} = validateCat;

            const updatedCat = await categoryService.updateCategory(req.params.id, cat_name,type)

            if (updatedCat) {
                res.status(200).json({message: "Category updated successfully."});
            } else {
                res.status(404).json({error: 'Category not Found or no change made'});
            }
        } catch(error){
            console.error('Error updating category',error)
            res.status(500).json({message: 'Error updating category'});
        }
    },

    //DELETE
    deleteCategory: async (req, res) => {
         try{
             const catId = req.params.id;
             const deletedCategory = await categoryService.deleteCategory(catId);
             if (deletedCategory > 0){
                 res.status(200).json({message: "Category deleted successfully."});
             } else {
                 res.status(404).json({error: 'Category not found'});
             }
         } catch(error){
             console.error('Error deleting category',error)
             res.status(500).json({message: 'Error deleting category'});
         }
    }
};

module.exports = categoryController;