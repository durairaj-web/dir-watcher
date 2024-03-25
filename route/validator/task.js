'use strict';

const { check } = require('express-validator'); // Importing the check function from express-validator module
const { messageTxt } = require('./../../constants'); // Importing message constants for error messages

// Define the validation middleware for magicString
const validateMagicString = [
    check('magicString') // Checking the magicString field
        .not().isEmpty() // Ensuring it is not empty
        .withMessage(messageTxt.MAGIC_STRING_REQUIRED) // Adding a custom error message if it is empty
];

module.exports = {
    validateMagicString // Exporting the middleware for use in other parts of the application
}