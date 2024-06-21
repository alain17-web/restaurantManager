const yup = require("yup");

const updateFromKitchenValidator = yup.object({
    validated: yup.string().required(),
    validatedBy: yup.string().required()
})

module.exports = updateFromKitchenValidator;