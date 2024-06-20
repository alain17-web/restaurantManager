const yup = require('yup');

const authValidator = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
});

module.exports = authValidator;