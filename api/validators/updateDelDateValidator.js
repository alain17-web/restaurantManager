const yup = require("yup");

const updateDelDateValidator = yup.object({
    delivery_date: yup.string().required(),
});

module.exports = updateDelDateValidator;