//See comments in authValidator to understand this validator used in purchaseItemController
const yup = require("yup");

const updateDelDateValidator = yup.object({
    delivery_date: yup.string().required(),
});

module.exports = updateDelDateValidator;