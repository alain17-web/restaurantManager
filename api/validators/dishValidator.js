//See comments in authValidator to understand this validator used in dishController
const yup = require("yup");

const dishValidator = yup.object({
    name: yup.string().required(),
    desc: yup.string().required(),
    cat_id:yup.number().required(),
    allerg:yup.string(),
    price:yup.number().required(),
    cost:yup.number().required(),
    min:yup.number().required(),
})

module.exports = dishValidator;