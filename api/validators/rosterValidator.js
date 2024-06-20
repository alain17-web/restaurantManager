const yup = require("yup");

const rosterValidator = yup.object({
    roster: yup.string().required()
})

module.exports = rosterValidator;