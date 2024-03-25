'use strict';

// Object containing message texts for different scenarios
const messageTxt = {
    'DB_CONNECTIVITY_ERROR': 'Something went wrong. Please try after some time.', // Error message for db connectivity
    'LIST_SUCCESS': 'Task list retrieval successful', // Success message for task list retrieval
    'LIST_FAILED': 'Task list retrieval failed', // Failure message for task list retrieval
    'TASK_STARTED_SUCCESS': 'Task started successfully.', // Success message for task start
    'TASK_STOPPED_SUCCESS': 'Task stopped successfully.', // Success message for task stop
    'MAGIC_STRING_REQUIRED': 'Magic string is required.' // Error message for missing magic string
    
}

module.exports = messageTxt; // Exporting the message text object for use in other parts of the application