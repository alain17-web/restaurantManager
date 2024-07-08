const yup = require("yup");

const purchaseItemValidator = yup.object({
    purchase_id: yup.number().required(),
    type: yup.string().required(),
    name: yup.string().required(),
    cost: yup.number().required(),
})

module.exports = purchaseItemValidator;