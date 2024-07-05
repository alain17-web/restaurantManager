const yup = require("yup");

const financeValidator = yup.object({
    income: yup.number().required(),
    income_date: yup.string().required(),
    comments: yup.string(),
    spendings: yup.number().required(),
    spending_date: yup.string().required(),
    remarks: yup.string(),
    total_on_hand: yup.number().required(),
    profits: yup.number().required(),
})

module.exports = financeValidator;