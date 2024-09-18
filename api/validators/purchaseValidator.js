//See comments in authValidator to understand this validator used in purchaseController
const yup = require("yup");

const purchaseValidator = yup.object({
    purchase_date: yup.string().required(),
    totalPurchase: yup.number().required(),
    delivery_date: yup.string().required()
})

module.exports = purchaseValidator;