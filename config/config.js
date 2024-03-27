'use strict'

// Load environment variables from .env file and parse them
const dotenv = (require("dotenv").config()).parsed

// Configuration object for Sequelize
let config = {
    database: dotenv.DB_DATABASE, // Database name
    username: dotenv.DB_USERNAME, // Database username
    password: dotenv.DB_PASSWORD, // Database password
    host: dotenv.DB_HOST, // Database host
    dialect: dotenv.DB_DIALECT // Database dialect (e.g., mysql, postgres, sqlite)
};

// Exporting configuration objects for different environments
module.exports = {
    development: config, // Development environment
    test: config, // Test environment
    production: config // Production environment
}