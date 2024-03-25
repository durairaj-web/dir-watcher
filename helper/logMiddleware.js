const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the logging level
    format: winston.format.json(), // Define the log format
    transports: [
        // Define transports (e.g., console, file)
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

module.exports = logger;
