const orderService = require('../services/order.service');
const orderValidator = require('../validators/orderValidator');
const updateFromKitchenValidator = require('../validators/updateFromKitchenValidator');

const orderController = {
    //CREATE
    addOrder: async (req, res) => {
        try {
            const validateOrder = await orderValidator.validate(req.body, {abortEarly: false});

            const {people,username, order_date, total, validated, validatedBy} = validateOrder;

            const orderResult = await orderService.addOrder({people,username, order_date, total, validated, validatedBy});

            res.status(200).json({message: 'Order created successfully', orderResult});

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: 'Error creating order controller', error});
        }
    },

    //READ
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error getAllOrders controller', error)
            res.status(500).json({message: 'Error getAllOrders controller', error});
        }
    },

    getOrderById: async (req, res) => {
        try{
            const order = await orderService.getOrderById(req.params.order_id);
            if(order.length === 0) {
                res.status(404).json({message: 'No order with this order found'});
            }
            res.status(200).json(order);
        }catch(error){
            console.error('Error getOrderById controller', error)
            res.status(500).json({message: 'Error getOrderById controller', error});
        }
    },

    getLastValidatedOrderId: async (req, res) => {
        try{
            const orderId = await orderService.getLastValidatedOrderId();
            res.status(200).json(orderId);
        }catch(error){
            console.error('Error getLastValidatedOrderId controller', error)
            res.status(500).json({message: 'Error getLastValidatedOrderId controller', error});
        }
    },

    //UPDATE
    updateOrder: async (req, res) => {
        try {

            const validateOrder = await updateFromKitchenValidator.validate(req.body);

            const {order_id,validated,validatedBy} = validateOrder;

            const updatedOrder = await orderService.updateOrder(order_id,validated,validatedBy);

            if (updatedOrder) {
                res.status(200).json({message: 'Order updated successfully.'});
            } else {
                res.status(404).json({error: 'Order not Found or no change made'});
            }
        } catch (error) {
            console.error('Error updateOrder controller', error)
            res.status(500).json({message: 'Error updating order controller', error});
        }
    },

    //DELETE
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const deletedOrder = await orderService.deleteOrder(orderId);
            if (deletedOrder > 0) {
                res.status(200).json({message: 'Order deleted successfully.'});
            } else {
                res.status(404).json({error: 'Order not Found'});
            }
        } catch (error){
            console.error('Error deleteOrder controller',error)
            res.status(500).json({message: 'Error deleteOrder controller', error});
        }
    }
};

module.exports = orderController;