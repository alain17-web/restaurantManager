const dishService = require('../services/dish.service');
const dishValidator = require('../validators/dishValidator');
const path = require('node:path');
const fs = require('fs');

//See comments in booking.controller to understand the logic on this controller called in the router
const dishController = {
    //CREATE
    addDish: async (req, res) => {
        try {
            const validateDish = await dishValidator.validate(req.body);

            const {name, desc, cat_id, allerg, price, cost, min} = validateDish;

            const img = req.file ? req.file.filename : null;

            if (!img) {
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
                img
            })

            res.status(200).json({message: 'Dish created successfully.', dish: dishResult});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: "Error controller creating the dish", error});
        }
    },

    //READ
    getAllDishes: async (req, res) => {
        try {
            const dishes = await dishService.getAllDishes();
            res.status(200).json(dishes);
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

            const {name, desc, cat_id, allerg, price, cost, min} = validateDish;

            // Check if an image file was uploaded, and if so, get the filename; otherwise, set it to null
            const img = req.file ? req.file.filename : null;

            // Retrieve the previous dish data by its ID (to check if an old image exists)
            const prevDish = await dishService.getDishById(req.params.id)

            const updatedDish = await dishService.updateDish(req.params.id, name, desc, cat_id, allerg, price, cost, min, img);
            if (updatedDish) {
                // If a new image was uploaded and there was an existing image, delete the old image
                if(img && prevDish && prevDish.img){
                    const imagePath = path.join(__dirname,'../uploads/img', prevDish.img);
                    // Use fs.unlink to delete the old image file from the file system
                    fs.unlink(imagePath, (error) => {
                        if (error) {
                            console.error('Error deleting previous image file:', error);
                        } else {
                            console.log('Old image file deleted successfully');
                        }
                    });
                }
                res.status(200).json({message: "Dish updated successfully."});
            } else {
                res.status(404).json({message: "Dish not found or no change made."});
            }

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: "Error controller updateDish", error});
        }
    },

    //DELETE
    deleteDish: async (req, res) => {
        try{
            const dishId = req.params.id;

            const dish = await dishService.getDishById(dishId);

            if (!dish) {
                return res.status(404).json({ message: 'Dish not found' });
            }

            const imagePath = path.join(__dirname, '../uploads/img', dish.img);

            const deletedDish = await dishService.deleteDish(dishId);

            if (deletedDish > 0){
                fs.unlink(imagePath, (error) => {
                    if (error) {
                        console.error('Error deleting image file:', error);
                    }
                });
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