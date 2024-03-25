'use strict';

const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic');
const fs = require('fs');
const os = require('os');
const { Task } = require('../models');
const Response = require('./../helper/response');
const { messageTxt, errorCode, statusCode } = require('./../constants');
const interval = parseInt(process.env.TASK_INTERVAL, 10) || 3000;

// Function to start background task
async function startTask(magicStringParam) {
    const directory = os.homedir() + process.env.SCAN_DIRCTORY || '/Test';
    const magicString = magicStringParam || process.env.MAGIC_STRING ;
    let isTaskRunning = false;
    let taskId;

    if (!isTaskRunning) {
        console.log("start")
        isTaskRunning = true;
        taskId = Date.now();
        const startTime = new Date();

        // readdirSync to get updated list of files
        const filesBefore = fs.readdirSync(directory);

        // counting occurrences of magicString
        const occurrences = filesBefore.reduce((acc, file) => {
            const content = fs.readFileSync(`${directory}/${file}`, 'utf8');
            return acc + (content.match(new RegExp(magicString, 'g')) || []).length;
        }, 0);

        // readdirSync again to get updated list of files
        const filesAfter = fs.readdirSync(directory);

        // Find files added and deleted
        const filesAdded = filesAfter.filter(file => !filesBefore.includes(file));
        const filesDeleted = filesBefore.filter(file => !filesAfter.includes(file));

        // DB operation
        console.log("startTime "+ startTime)
        console.log("occurrences "+ occurrences)
        console.log("filesAdded "+ filesAdded)
        console.log("filesDeleted "+ filesDeleted)

        isTaskRunning = false;
    }
}

// Background task scheduler
let taskInterval = setIntervalAsync(startTask, interval);

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

const start = async (req, res) => {
    let magicString = req.body.magicString;

    clearIntervalAsync(taskInterval);
    taskInterval = setIntervalAsync(async() => {
        await startTask(magicString)
    }, interval);
    const response = new Response();
    response.message = messageTxt.TASK_STARTED_SUCCESS;
    res.status(statusCode.RESPONSE_OK).send(response);
}

const stop = async (req, res) => {
    clearIntervalAsync(taskInterval);
    const response = new Response();
    response.message = messageTxt.TASK_STOPPED_SUCCESS;
    res.status(statusCode.RESPONSE_OK).send(response);
}

module.exports = {
    list,
    start,
    stop
}