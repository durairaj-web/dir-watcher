'use strict';

const fs = require('fs'); // File system module for interacting with the file system
const path = require('path'); // Path module for working with file and directory paths
const Sequelize = require('sequelize'); // Sequelize ORM for Node.js
const process = require('process'); // Process module for accessing environment variables
const basename = path.basename(__filename); // Basename of the current module file
const env = process.env.NODE_ENV || 'development'; // Environment (defaults to 'development')
const config = require(__dirname + '/../config/config.js')[env]; // Database configuration
const db = {}; // Object to hold database models

let sequelize; // Sequelize instance

// Establish Sequelize connection based on configuration
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all model files in the current directory and initialize them
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Exclude hidden files
            file !== basename && // Exclude the current file
            file.slice(-3) === '.js' && // Filter out only JavaScript files
            file.indexOf('.test.js') === -1 // Exclude test files
        );
    })
    .forEach(file => {
        // Initialize model and add it to the db object
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Establish associations between models
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Add Sequelize and sequelize instances to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // Export the db object
