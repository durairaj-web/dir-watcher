'use strict';

const express = require('express'); // Express framework for Node.js
const cors = require('cors'); // CORS middleware for handling Cross-Origin Resource Sharing
require('dotenv').config(); // Load environment variables from a .env file
const checkDbConnectivity = require('./helper/dbConnectivity'); // Database connectivity check function
const logger = require('./helper/logMiddleware'); // Logging middleware
const taskRoute = require('./route/task'); // Route handler for tasks

// Create an Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to check database connectivity
app.use(checkDbConnectivity);

// Custom middleware to log response data
app.use((req, res, next) => {
    let isResponseSent = false;
    const originalSend = res.send;
    res.send = function(data) {
        if (!isResponseSent) {
            logger.info(`${req.method} ${req.url} - ${res.statusCode}`);
            isResponseSent = true;
        }
        originalSend.call(this, data);
    };
    next();
})

// Route handler for tasks
app.use('/task', taskRoute);

// PORT number for the server to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});