const yup = require("yup");

const updateTotalValidator = yup.object({
    total: yup.number(),
});

module.exports = updateTotalValidator;
