const yup = require("yup");

const financeValidator = yup.object({
    total: yup.number(),
    order_date: yup.string(),
    order_id: yup.number(),
    comments: yup.string(),
    spendings: yup.number(),
    purchase_date: yup.string(),
    purchase_id: yup.number(),
    remarks: yup.string(),
    total_on_hand: yup.number().required()
})

module.exports = financeValidator;