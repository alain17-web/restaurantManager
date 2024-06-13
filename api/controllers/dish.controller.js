const dishService = require('../services/dish.service');
const dishValidator = require('../validators/dishValidator');

const dishController = {
    //CREATE
    addDish: async (req, res) => {
        try{
            const validateDish = await dishValidator.validate(req.body);

            const {name,desc,cat_id,allerg,price,cost,min} = validateDish;

            const imgPath = req.file ? `/uploads/img/${req.file.filename}` : null;

            if (!imgPath) {
                return res.status(400).json({ errors: ["Image is required"] });
            }

            const dishResult = await dishService.addDish({
                name,
                desc,
                cat_id,
                allerg,
                price,
                cost,
                min,
                img:imgPath
            })

            res.status(201).json({ message: 'Dish created successfully.', dish: dishResult });
        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: "Error controller creating the dish",error});
        }
    },

    //READ
    getAllDishes: async(req,res)=>{
        try{
            const dishes = await dishService.getAllDishes();
            res.status(201).json(dishes);
        } catch(error){
            console.error('Error getAllDishes controller',error)
            res.status(500).json({message:"Error getAllDishes controller",error});
        }
    }
}
module.exports = dishController;