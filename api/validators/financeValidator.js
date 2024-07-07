const yup = require("yup");

const financeValidator = yup.object({
    income: yup.number(),
    income_date: yup.string(),
    comments: yup.string(),
    spendings: yup.number(),
    spending_date: yup.string(),
    remarks: yup.string(),
    total_on_hand: yup.number().required(),
    profits: yup.number(),
})

module.exports = financeValidator;