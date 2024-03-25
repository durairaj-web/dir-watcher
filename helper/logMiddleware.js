'use strict'

const winston = require('winston'); // Importing the Winston logging library

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the logging level to 'info'
    format: winston.format.json(), // Define the log format as JSON
    transports: [
        // Define transports (e.g., console, file)
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a file
    ]
});

module.exports = logger; // Exporting the logger instance for use in other parts of the application
