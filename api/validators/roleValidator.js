const yup = require("yup");

const roleValidator = yup.object({
    role_name: yup.string().required()
})

module.exports = roleValidator;