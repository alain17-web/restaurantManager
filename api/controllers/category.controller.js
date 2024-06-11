const categoryService = require("../services/category.service");
const categoryValidator = require("../validators/categoryValidator");

const categoryController = {
    //CREATE
    addCategory: async (req, res) => {
        try{
            const validateCat = await categoryValidator.validate(req.body);

            const {cat_name,type} = validateCat;

            const catResult = await categoryService.addCategory({cat_name,type})

            res.status(201).json({message: "Category created successfully.", catResult});

        } catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: 'Error controller creating the category'});
        }
    },

    //READ
    getAllCategories: async(req,res)=>{
        try{
            const categories = await categoryService.getAllCategories();
            res.status(201).json(categories);
        }catch(error){
            console.error('Error getAllCategories controller',error)
            res.status(500).json({message: 'Error getAllCategories controller'});
        }
    }
};

module.exports = categoryController;