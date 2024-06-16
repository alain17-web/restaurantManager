const orderService = require('../services/order.service');
const orderValidator = require('../validators/orderValidator');

const orderController = {
    //CREATE
    addOrder: async (req, res) => {
        try {
            const validateOrder = await orderValidator.validate(req.body, {abortEarly: false});

            const {username, order_date, total, validated, validatedBy} = validateOrder;

            const orderResult = await orderService.addOrder({username, order_date, total, validated, validatedBy});

            res.status(201).json({message: 'Order created successfully', orderResult});

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: 'Error creating order controller', error});
        }
    },

    //READ
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(201).json(orders);
        } catch (error) {
            console.error('Error getAllOrders controller', error)
            res.status(500).json({message: 'Error getAllOrders controller', error});
        }
    },

    //UPDATE
    updateOrder: async (req, res) => {
        try {
            const validateOrder = await orderValidator.validate(req.body);

            const {order_id, username, order_date, total, validated, validatedBy} = validateOrder;

            const updatedOrder = await orderService.updateOrder({
                order_id,
                username,
                order_date,
                total,
                validated,
                validatedBy
            });

            if (updatedOrder) {
                res.status(201).json({message: 'Order updated successfully.'});
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