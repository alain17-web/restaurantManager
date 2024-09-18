//See comments in authValidator to understand this validator used in roleController
const yup = require("yup");

const roleValidator = yup.object({
    role_name: yup.string().required()
})

module.exports = roleValidator;