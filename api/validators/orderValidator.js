//See comments in authValidator to understand this validator used in orderController
const yup = require("yup");

const orderValidator = yup.object({
    people: yup.number().required(),
    username: yup.string().required(),
    order_date: yup.string().required(),
    total: yup.number().required(),
    validated: yup.string().required(),
    validatedBy: yup.string()
})

module.exports = orderValidator;