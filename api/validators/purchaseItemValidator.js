//See comments in authValidator to understand this validator used in purchaseItemController
const yup = require("yup");

const purchaseItemValidator = yup.object({
    qty: yup.number(),
})

module.exports = purchaseItemValidator;