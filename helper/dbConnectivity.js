'use strict';

const db = require('../models/index'); // Importing the Sequelize models
const Response = require('./../helper/response'); // Importing Response class for creating standardized responses
const { errorCode, statusCode } = require('./../constants'); // Importing error and status code constants

// Middleware function to check database connectivity
const checkDbConnectivity = async (req, res, next) => {
    try {
        await db.sequelize.authenticate() // Attempt to authenticate with the database
        next(); // If successful, proceed to the next middleware
    } catch (error) {
        console.log(error) // Log any errors to the console
        const response = new Response();
        response.status = false;
        response.errorCode = errorCode.DB_CONNECTIVITY_ERROR;
        response.message = messageTxt.INTERNAL_SERVER_ERROR;
        res.status(statusCode.DB_CONNECTIVITY_ERROR).send(response);
    }
}

module.exports = checkDbConnectivity; // Exporting the middleware function for use in other parts of the application