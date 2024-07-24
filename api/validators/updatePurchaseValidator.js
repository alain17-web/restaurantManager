const yup = require("yup");

const updatePurchaseValidator = yup.object({
    total: yup.number().required(),
    delivery_date: yup.string().required()
});

module.exports = updatePurchaseValidator;
