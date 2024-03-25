'use strict';

const { Model } = require('sequelize');

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
  Task.init({
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    total_runtime: DataTypes.INTEGER,
    files_added: DataTypes.TEXT,
    files_deleted: DataTypes.TEXT,
    magic_string_count: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};