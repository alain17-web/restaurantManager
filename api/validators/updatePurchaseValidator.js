const yup = require("yup");

const updatePurchaseValidator = yup.object({
    delivery_date: yup.string().required()
});

module.exports = updatePurchaseValidator;
