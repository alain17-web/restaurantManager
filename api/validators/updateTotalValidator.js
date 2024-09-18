//See comments in authValidator to understand this validator used in purchaseController
const yup = require("yup");

const updateTotalValidator = yup.object({
    total: yup.number(),
});

module.exports = updateTotalValidator;
