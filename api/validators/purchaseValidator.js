const yup = require("yup");

const purchaseValidator = yup.object({
    purchase_date: yup.string().required(),
    total: yup.number().required(),
    delivery_date: yup.string().required()
})

module.exports = purchaseValidator;