const dishService = require('../services/dish.service');
const dishValidator = require('../validators/dishValidator');

const dishController = {
    //CREATE
    addDish: async (req, res) => {
        try {
            const validateDish = await dishValidator.validate(req.body);

            const {name, desc, cat_id, allerg, price, cost, min} = validateDish;

            const imgPath = req.file ? `/uploads/img/${req.file.filename}` : null;

            if (!imgPath) {
                return res.status(400).json({errors: ["Image is required"]});
            }

            const dishResult = await dishService.addDish({
                name,
                desc,
                cat_id,
                allerg,
                price,
                cost,
                min,
                img: imgPath
            })

            res.status(201).json({message: 'Dish created successfully.', dish: dishResult});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: "Error controller creating the dish", error});
        }
    },

    //READ
    getAllDishes: async (req, res) => {
        try {
            const dishes = await dishService.getAllDishes();
            res.status(201).json(dishes);
        } catch (error) {
            console.error('Error getAllDishes controller', error)
            res.status(500).json({message: "Error getAllDishes controller", error});
        }
    },

    getDishById: async (req, res) => {
        try{
            const dishId = req.params.id;
            const dish = await dishService.getDishById(dishId);

            if(dish){
                res.status(200).json(dish);
            }
        }catch(error){
            console.error('Error getDishById controller', error)
            res.status(500).json({message: "Error getDishById controller", error});
        }
    },

    //UPDATE
    updateDish: async (req, res) => {
        try {
            const validateDish = await dishValidator.validate(req.body);

            const {name, desc, cat_id, allerg, price, cost, min, img} = validateDish;

            const updatedDish = await dishService.updateDish(req.params.id, name, desc, cat_id, allerg, price, cost, min, img);
            if (updatedDish) {
                res.status(200).json({message: "Dish updated successfully."});
            } else {
                res.status(404).json({message: "Dish not found or no change made."});
            }

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: "Error controller updateDish", error});
        }
    },

    //DELETE
    deleteDish: async (req, res) => {
        try{
            const dishId = req.params.id;

            const deletedDish = await dishService.deleteDish(dishId);

            if (deletedDish > 0){
                res.status(200).json({message:"Dish deleted successfully."});
            } else {
                res.status(404).json({error: 'Dish not found'});
            }
        } catch(error){
            console.error('Error deleteDish controller',error)
            res.status(500).json({message:"Error deleteDish controller",error,});
        }
    }
}
module.exports = dishController;