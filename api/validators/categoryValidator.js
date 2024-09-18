//See comments in authValidator to understand this validator used in categoryController
const yup = require("yup");

const categoryValidator = yup.object({
    cat_name: yup.string().required(),
    type: yup.string().required()
})

module.exports = categoryValidator;