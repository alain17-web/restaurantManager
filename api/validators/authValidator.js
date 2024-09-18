// Importing the yup validation library
const yup = require('yup');

// Creating a schema for validating login credentials using yup
const authValidator = yup.object({
    // Validate that the username is a string and is required (cannot be empty)
    username: yup.string().required(),

    // Validate that the password is a string and is required (cannot be empty)
    password: yup.string().required()
});

module.exports = authValidator;