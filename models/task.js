'use strict';

const { Model } = require('sequelize'); // Importing Model class from Sequelize

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
        // define association here
        }
    }

    // Initializing Task model with defined attributes and options
    Task.init({
        start_time: DataTypes.DATE, // Start time of the task
        end_time: DataTypes.DATE, // End time of the task
        total_runtime: DataTypes.INTEGER, // Total runtime of the task
        files_added: DataTypes.TEXT, // Text containing added files
        files_deleted: DataTypes.TEXT, // Text containing deleted files
        magic_string_count: DataTypes.INTEGER, // Count of magic strings
        status: DataTypes.STRING // Status of the task
    }, {
        sequelize, // Sequelize instance
        modelName: 'Task', // Model name
    });

    return Task; // Returning the Task model
};