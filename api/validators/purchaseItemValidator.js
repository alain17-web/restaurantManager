const yup = require("yup");

const purchaseItemValidator = yup.object({
    qty: yup.number(),
})

module.exports = purchaseItemValidator;