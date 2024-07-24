const yup = require("yup");

/*const updateQtyValidator = yup.object({
    type: yup.string().required(),
    qty: yup.number().required()
});*/

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
