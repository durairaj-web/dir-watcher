'use strict';

const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic'); // Module for asynchronous interval handling
const fs = require('fs'); // File system module for file operations
const os = require('os'); // Operating system module for system-specific operations
const { Task } = require('../models'); // Import Task model for database operations
const Response = require('./../helper/response'); // Custom response handler
const { messageTxt, errorCode, statusCode } = require('./../constants'); // Constants for messages, error codes, and status codes
const interval = parseInt(process.env.TASK_INTERVAL, 10) || 30000; // Interval for background task execution, defaults to 3000 milliseconds if not specified in environment variables

// intial files list 
let initialFilesList = [];

// Function to start background task
async function startTask(magicStringParam) {
    // Get the directory path for file scanning, default to '/Test' if not specified in environment variables
    const directory = os.homedir() + process.env.SCAN_DIRCTORY || '/Test';
    const magicString = magicStringParam || process.env.MAGIC_STRING ; // Get the magic string for scanning, from environment variables or parameter
    let isTaskRunning = false; // Flag to check if the task is already running
    let taskId;

    // Check if task is not already running
    if (!isTaskRunning) {
        isTaskRunning = true; // Set task as running
        taskId = Date.now(); // Unique ID for the current task
        const startTime = new Date();
        
        // readdirSync to get list of files
        const filesList = fs.readdirSync(directory);

        // counting occurrences of magicString
        const occurrences = filesList.reduce((acc, file) => {
            const content = fs.readFileSync(`${directory}/${file}`, 'utf8'); // Read file content
            return acc + (content.match(new RegExp(magicString, 'g')) || []).length; // Count occurrences of magicString
        }, 0);

        // Calculate endTime and totalRunTime
        const endTime = new Date();
        const totalRunTime = endTime - startTime;

        let filesAdded;
        let filesDeleted;
        if (initialFilesList.length > 0) {

            // Find files added and deleted
            filesAdded = filesList.filter(file => !initialFilesList.includes(file)); // Files added
            filesDeleted = initialFilesList.filter(file => !filesList.includes(file)); // Files deleted
        }

        // Update initialFilesList
        initialFilesList = filesList;

        // Create a new Task instance with the details
        const newTask = new Task({
            start_time: startTime, // Save the task start time
            end_time: endTime, // Save the task end time
            total_runtime: totalRunTime, // Save the task total run time
            files_added: JSON.stringify(filesAdded), // Save filesAdded as a JSON string
            files_deleted: JSON.stringify(filesDeleted), // Save filesDeleted as a JSON string
            magic_string_count: occurrences // Save the count of magicString occurrences
        });
        // Save the new task to the database
        await newTask.save();
        isTaskRunning = false; // Set task as not running
    }
}

// Background task scheduler
let taskInterval = setIntervalAsync(startTask, interval); // Start the background task with the specified interval

// Function to list tasks
const list = async (req, res) => {
    const response = new Response(); // Create a new response object
    try {
        const tasks = await Task.findAll({}); // Retrieve tasks from the database
        response.data = tasks; // Set response data
        response.message = messageTxt.LIST_SUCCESS; // Set success message
        res.status(statusCode.RESPONSE_OK).send(response); // Send response
    } catch (error) {
        console.log(error)

        response.status = false; // Set response status to false
        response.message = messageTxt.LIST_FAILED; // Set failure message
        response.errorCode = errorCode.LIST_RETRIEVAL_FAILED; // Set error code
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(response); // Send response with internal server error status
    }
}

// Function to start the background task with a new magicString
const start = async (req, res) => {
    let magicString = req.body.magicString; // Get magicString from request body

    clearIntervalAsync(taskInterval); // Clear existing task interval
    taskInterval = setIntervalAsync(async() => {
        await startTask(magicString) // Start the task with the new magicString
    }, interval);
    const response = new Response(); // Create a new response object
    response.message = messageTxt.TASK_STARTED_SUCCESS; // Set success message
    res.status(statusCode.RESPONSE_OK).send(response); // Send response
}

// Function to stop the background task
const stop = async (req, res) => {
    clearIntervalAsync(taskInterval); // Clear the task interval
    const response = new Response(); // Create a new response object
    response.message = messageTxt.TASK_STOPPED_SUCCESS; // Set success message
    res.status(statusCode.RESPONSE_OK).send(response); // Send response
}

// Export functions
module.exports = {
    list,
    start,
    stop
}