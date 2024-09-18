//See comments in authValidator to understand this validator used in orderItemController
const yup = require("yup");

const orderItemValidator = yup.object({
    order_id: yup.number().required(),
    type: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    validated: yup.string(),
    validatedBy: yup.string()
})

module.exports = orderItemValidator;