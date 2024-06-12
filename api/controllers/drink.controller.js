const drinkService = require("../services/drink.service");
const drinkValidator = require("../validators/drinkValidator");

const drinkController =  {
    //CREATE
    addDrink: async (req, res) => {
        try{
           const validateDrink = await drinkValidator.validate(req.body);

           const {name,cat_id,price,cost,min} = validateDrink;

           const drinkResult = await drinkService.addDrink({name,cat_id,price,cost,min});

           res.status(201).json({message:"Drink created successfully.", drinkResult});

        }catch(error){
            if(error.name === "ValidationError"){
                return res.status(400).json({errors: error.errors});
            }
             res.status(500).json({message: "Error controller creating the drink"});
        }
    },

    //READ
    getAllDrinks: async(req,res)=>{
        try{
           const drinks = await drinkService.getAllDrinks();
           res.status(201).json(drinks);
        } catch(error){
            console.error('Error getAllDrinks controller',error)
            res.status(500).json({message:"Error getAllDrinks controller"});
        }
    },

    //UPDATE
    updateDrink: async (req, res) => {
        try{
            const validateDrink = await drinkValidator.validate(req.body);
            const {name,cat_id,price,cost,min} = validateDrink;

            const updatedDrink = await drinkService.updateDrink(req.params.id,name,cat_id,price,cost,min);
            if (updatedDrink) {
                res.status(201).json({message:"Drink updated successfully."});
            } else {
                res.status(404).json({error: "Drink not found or no change made"});
            }
        } catch(error){
            console.error('Error updateDrink controller',error)
            res.status(500).json({message: 'Error updateDrink controller', error,});
        }
    }
}
module.exports = drinkController;