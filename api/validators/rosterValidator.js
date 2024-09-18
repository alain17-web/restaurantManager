//See comments in authValidator to understand this validator used in rosterController
const yup = require("yup");

const rosterValidator = yup.object({
    roster: yup.string().required()
})

module.exports = rosterValidator;