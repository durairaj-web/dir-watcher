'use strict';
const { validationResult } = require('express-validator');
const taskValidator = require('./task');
const Response = require('./../../helper/response');
const { errorCode, statusCode } = require('./../../constants');

function validationError(req, res, next){
    const errors = validationResult(req);
    const response = new Response();
    if (!errors.isEmpty()) {
        let messages = [];
        errors.array().forEach(err => {
            messages.push({[err.path]: err.msg});
        })
        response.status = false;
        response.errorCode = errorCode.BAD_REQUEST;
        response.message = messages;
        return res.status(statusCode.BAD_REQUEST).send(response);
    }else{
        next();
    }

}

module.exports = {
    taskValidator,
    validationError
}