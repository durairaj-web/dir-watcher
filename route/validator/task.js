'use strict';
const { check } = require('express-validator');
const { messageTxt } = require('./../../constants');

// Define the validation middleware
const validateMagicString = [
    check('magicString')
      .not().isEmpty().withMessage(messageTxt.MAGIC_STRING_REQUIRED)
  ];

  
  module.exports = {
    validateMagicString
  }