'use strict';

const { Task } = require('../models');
const Response = require('./../helper/response');
const { messageTxt, errorCode, statusCode } = require('./../constants')

const list = async (req, res) => {
    const response = new Response();
    try {
        const tasks = await Task.findAll({});
        response.data = tasks;
        response.message = messageTxt.LIST_SUCCESS;
        res.status(statusCode.RESPONSE_OK).send(response);
    } catch (error) {
        console.log(error)

        response.status = false;
        response.message = messageTxt.LIST_FAILED;
        response.errorCode = errorCode.LIST_RETRIEVAL_FAILED;
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }
}

module.exports = {
    list
}