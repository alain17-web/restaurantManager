const yup = require("yup");

const updateQtyValidator = yup.object({
    qty: yup.number().required()
});

module.exports = updateQtyValidator;
