# dir-watcher

## Overview
This is a Node.js application named `dir-watcher` that provides functionality for monitoring directories. It utilizes Express framework for handling HTTP requests and Sequelize ORM for database operations.

## Node.js Version
This project is developed using Node.js version 16.x

## Dependencies
The following dependencies are required for this project:

- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.1
- `express-validator`: ^7.0.1
- `mysql2`: ^3.9.2
- `sequelize`: ^6.37.1
- `sequelize-cli`: ^6.6.2
- `set-interval-async`: ^3.0.3
- `winston`: ^3.13.0
- `nodemon`: ^3.1.0 (Development)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/dir-watcher.git
   
2. Install dependencies:
   ```sh
   npm install
   
3. Environment variable setup:
- Create a .env file in the root directory.
- Add the following environment variables and adjust them according to your configuration:
   ```sh
   DB_DATABASE=dir_Watcher
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_HOST=127.0.0.1
   DB_DIALECT=mysql
   SCAN_DIRCTORY=/YourDirectory
   TASK_INTERVAL=30000
   MAGIC_STRING=magic
   
4. Database Setup:
   ```sh
   sequelize db:migrate
   
5. Start the application:
- for production
   ```sh
   npm start or npm run start_monitor (if you want to use nodemon for development)
- for development  (with nodemon)
   ```sh
   npm run start_monitor

## REST API Documentation
List Tasks

    URL: /
    Method: GET
    Description: Retrieves a list of tasks.
    Response:
        Status: 200 OK
        Body: JSON array of tasks.

Start Task

    URL: /start
    Method: GET
    Description: Starts a task.
    Query Parameters:
        magicString: A unique string to validate the request.
    Response:
        Status: 200 OK
        Body: JSON object confirming the start of the task.
    Error Response:
        Status: 400 Bad Request
        Body: Error message if the magic string validation fails.

Stop Task

    URL: /stop
    Method: GET
    Description: Stops a task.
    Response:
        Status: 200 OK
        Body: JSON object confirming the stop of the task.