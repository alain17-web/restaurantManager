const yup = require("yup");

const updateTotalValidator = yup.object({
    total: yup.number().required(),
});

module.exports = updateTotalValidator;
