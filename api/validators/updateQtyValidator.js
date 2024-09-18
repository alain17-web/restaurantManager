//See comments in authValidator to understand this validator used in purchaseItemController
const yup = require("yup");



const updateQtyValidator = yup.object({
    purchase_id: yup.number(),
    id: yup.number(),
    qty: yup.number().required(),
    type: yup.string().oneOf(["plats", "desserts", "boissons froides", "boissons chaudes"]),
    name: yup.string(),
    cost: yup.number(),
    delivery_date: yup.string()
});


module.exports = updateQtyValidator;
