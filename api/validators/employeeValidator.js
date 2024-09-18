//See comments in authValidator to understand this validator used in employeeController
const yup = require('yup');

const employeeValidator = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    role_id: yup.number().required(),
    email: yup.string().email().required(),
    tel: yup.string().required(),
    status_id: yup.number().required(),
    roster_id: yup.number().required(),
    gender: yup.string().required(),
});

module.exports = employeeValidator;