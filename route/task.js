'use strict';

const express = require('express');
const router = express.Router();
const { taskValidator, validationError } = require('./validator');
const taskController = require('../controllers/taskController');

router.get('/', taskController.list);
router.get('/start', taskValidator.validateMagicString, validationError, taskController.start);
router.get('/stop', taskController.stop);

module.exports = router;