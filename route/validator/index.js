'use strict';

const { validationResult } = require('express-validator'); // Importing validationResult function from express-validator
const taskValidator = require('./task'); // Importing taskValidator middleware
const Response = require('./../../helper/response'); // Importing Response class for creating standardized responses
const { errorCode, statusCode } = require('./../../constants'); // Importing error and status code constants

// Middleware function to handle validation errors
function validationError(req, res, next){
    const errors = validationResult(req); // Extracting validation errors from the request
    const response = new Response(); // Creating a new Response object

    if (!errors.isEmpty()) { // If there are validation errors
        let messages = [];
        errors.array().forEach(err => {
            messages.push({[err.path]: err.msg}); // Creating an array of error messages
        })
        response.status = false;
        response.errorCode = errorCode.BAD_REQUEST; // Setting error code for bad request
        response.message = messages; // Setting error messages in the response
        return res.status(statusCode.BAD_REQUEST).send(response); // Sending response with status code 400
    }else{
        next(); // Proceeding to the next middleware if there are no validation errors
    }

}

module.exports = {
    taskValidator, // Exporting taskValidator middleware
    validationError // Exporting validationError middleware
}