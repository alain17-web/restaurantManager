const yup = require("yup");

const orderItemValidator = yup.object({
    order_id: yup.number().required(),
    type: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
})

module.exports = orderItemValidator;