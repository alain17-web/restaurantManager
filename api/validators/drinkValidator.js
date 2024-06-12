const yup = require("yup");

const drinkValidator = yup.object({
    name: yup.string().required(),
    cat_id:yup.number().required(),
    price:yup.number().required(),
    cost:yup.number().required(),
    min:yup.number().required()
})

module.exports = drinkValidator;