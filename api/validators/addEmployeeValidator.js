const yup = require('yup');

const addEmployeeValidator = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    role: yup.string().required(),
    email: yup.string().email().required(),
    tel: yup.string().required(),
    status: yup.string().required(),
    roster: yup.string().required(),
});

module.exports = addEmployeeValidator;