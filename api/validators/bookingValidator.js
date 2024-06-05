const yup = require('yup');

const bookingValidator = yup.object({
    date: yup.string().required(),
    hour: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    people: yup.number().min(1).max(6).required()
});

module.exports = bookingValidator;