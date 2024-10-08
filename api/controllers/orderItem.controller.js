const orderItemService = require("../services/orderItem.service");
const orderItemValidator = require("../validators/orderItemValidator");
const updateFromKitchenValidator = require("../validators/updateFromKitchenValidator");

//See comments in booking.controller to understand the logic on this controller called in the router
const orderItemController = {
    //CREATE
    addOrderItem: async (req, res) => {
        try {
            const validateOrderItem = await orderItemValidator.validate(req.body);

            const {order_id, type, name, price, validated, validatedBy} = validateOrderItem;

            const orderItemResult = await orderItemService.addOrderItem({
                order_id,
                type,
                name,
                price,
                validated,
                validatedBy
            });

            res.status(200).json({message: "orderItem created sucessfully", orderItemResult})
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: 'Error controller addOrderItem', error});
        }
    },

    //READ
    getFirstUnvalidatedOrderItems: async (req, res) => {
        try {
            const orderItems = await orderItemService.getFirstUnvalidatedOrderItems()
            res.status(200).json(orderItems);
        } catch (error) {
            console.error('Error getFirstUnvalidatedOrderItems controller', error)
            res.status(500).json({message: "Error getFirstUnvalidatedOrderItems controller", error});
        }
    },

    getOrderItemByOrderId: async (req, res) => {
        try {
            const {order_id} = req.params;

            const orderItem = await orderItemService.getOrderItemByOrderId(order_id)

            res.status(200).json({orderItem})

        } catch (error) {
            console.error('Error getOrderItemByOrderId controller', error)
            res.status(500).json({message: 'Error getOrderItemByOrderId controller', error});
        }
    },

    //UPDATE
    updateOrderItemFromKitchen: async (req, res) => {
        try{

            const validateOrderItem = await updateFromKitchenValidator.validate(req.body);

           const {order_id,validated,validatedBy} = validateOrderItem;

           const updatedItems = await orderItemService.updateOrderItemFromKitchen(order_id, validated, validatedBy);

           if(updatedItems){
               res.status(200).json({message:"OrderItems validated successfully."});
           } else {
               res.status(404).json({error: 'OrderItems not found or no change made'});
           }
        } catch(error){
            console.error('Error updateOrderItemFromKitchen controller', error)
            res.status(500).json({message: 'Error updateOrderItemFromKitchen controller', error});
        }
    },

    //DELETE
    deleteOrderItemByOrderId: async (req, res) => {
        try{
            const orderId = req.params.order_id;
            const deletedOrderItem = await orderItemService.deleteOrderItemByOrderId(orderId);
            if(deletedOrderItem){
                res.status(200).json({message: "OrderItem deleted successfully."});
            }else{
                res.status(404).json({error: 'OrderItem not found'});
            }
        }catch(error){
            console.error('Error deleteOrderItemByOrderId controller', error)
            res.status(500).json({message: 'Error deleteOrderItemByOrderId controller', error});
        }
    }
}
module.exports = orderItemController;