const yup = require("yup");

const categoryValidator = yup.object({
    cat_name: yup.string().required(),
    type: yup.string().required()
})

module.exports = categoryValidator;