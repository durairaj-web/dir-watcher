'use strict';

// Object containing status codes for HTTP responses
const statusCode = {
    'RESPONSE_OK': 200, // Status code for successful response
    'BAD_REQUEST': 400, // Status code for bad request
    'INTERNAL_SERVER_ERROR': 500, // Status code for internal server error
}

module.exports = statusCode; // Exporting the status code object for use in other parts of the application