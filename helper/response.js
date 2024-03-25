'use strict'

// Response class for creating standardized responses
class Response {
    constructor(){
        this.status = true, // Default status is true
        this.data = {}, // Default data object is empty
        this.message = null, // Default message is null
        this.errorCode = null // Default errorCode is null
    }
}

module.exports = Response; // Exporting the Response class for use in other parts of the application