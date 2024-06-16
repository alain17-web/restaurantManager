const orderService = require('../services/order.service');
const orderValidator = require('../validators/orderValidator');

const orderController = {
    //CREATE
    addOrder: async (req, res) => {
        try{
            const validateOrder = await orderValidator.validate(req.body,{abortEarly:false});

            const {username,order_date,total,validated,validatedBy} = validateOrder;

            const orderResult = await orderService.addOrder({username,order_date,total,validated,validatedBy});

            res.status(201).json({message:'Order created successfully',orderResult});

        } catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: 'Error creating order controller',error});
        }
    },

    //READ
    getAllOrders: async(req,res)=>{
        try{
           const orders = await orderService.getAllOrders();
           res.status(201).json(orders);
        } catch(error){
            console.error('Error getAllOrders controller',error)
            res.status(500).json({message: 'Error getAllOrders controller',error});
        }
    }
};
module.exports = orderController;