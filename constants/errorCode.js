'use strict';

// Object containing error codes
const errorCode = {
    'LIST_RETRIEVAL_FAILED': 'LIST_RETRIEVAL_FAILED', // Error code for failed task list retrieval
    'BAD_REQUEST': 'BAD_REQUEST', // Error code for bad request
    'DB_CONNECTIVITY_ERROR': 'SYSTEM_ERROR' // Error code for internal server error
}

module.exports = errorCode; // Exporting the error code object for use in other parts of the application