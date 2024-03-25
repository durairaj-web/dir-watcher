'use strict';

const express = require('express'); // Importing Express framework
const router = express.Router(); // Creating an instance of Express Router for defining routes
const { taskValidator, validationError } = require('./validator'); // Importing validator functions
const taskController = require('../controllers/taskController'); // Importing task controller functions

// Route for listing tasks
router.get('/', taskController.list);

// Route for starting a task
router.get('/start', taskValidator.validateMagicString, validationError, taskController.start);

// Route for stopping a task
router.get('/stop', taskController.stop);

module.exports = router; // Exporting the router to be used in other parts of the application