//See comments in authValidator to understand this validator used in stockController
const yup = require("yup");

const stockValidator = yup.object({
    item_name: yup.string(),
    quantity: yup.number()
})

module.exports = stockValidator;