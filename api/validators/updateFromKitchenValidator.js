//See comments in authValidator to understand this validator used in orderItemController
const yup = require("yup");

const updateFromKitchenValidator = yup.object({
    validated: yup.string().required(),
    validatedBy: yup.string().required()
})

module.exports = updateFromKitchenValidator;