const orderItemService = require("../services/orderItem.service");
const orderItemValidator = require("../validators/orderItemValidator");
const orderService = require("../services/order.service");

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

            res.status(201).json({message: "orderItem created sucessfully", orderItemResult})
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: 'Error controller addOrderItem', error});
        }
    },

    //READ
    getAllUnvalidatedOrderItems: async (req, res) => {
        try {
            const orderItems = await orderItemService.getAllUnvalidatedOrderItems()
            res.status(201).json(orderItems);
        } catch (error) {
            console.error('Error getAllUnvalidatedOrderItems controller', error)
            res.status(500).json({message: "Error getAllUnvalidatedOrderItems controller", error});
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
    }
}
module.exports = orderItemController;