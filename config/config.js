'use strict'

const dotenv = (require("dotenv").config()).parsed

let config = {
    database: dotenv.DB_DATABASE,
    username: dotenv.DB_USERNAME,
    password: dotenv.DB_PASSWORD,
    host: dotenv.DB_HOST,
    dialect: dotenv.DB_DIALECT
};

module.exports = {
    development: config,
    test: config,
    production: config
}